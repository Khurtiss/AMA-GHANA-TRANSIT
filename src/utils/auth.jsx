import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, githubProvider, db } from './firebase';

const AuthContext = createContext({});

// Helper function to determine user role based on email
const getUserRole = (email) => {
  if (!email) return 'passenger';

  const emailLower = email.toLowerCase();
  if (emailLower === 'admin@amaghana.com') return 'admin';
  if (emailLower === 'operator@amaghana.com') return 'operator';
  if (emailLower.includes('driver@') || emailLower.includes('@driver.')) return 'driver';

  return 'passenger'; // Default role
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user role from Firestore (graceful offline support)
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        let userDoc = null;
        let role = 'passenger'; // default

        try {
          userDoc = await getDoc(userDocRef);
        } catch (error) {
          console.warn('Firestore read failed in AuthProvider:', error.code || error.message || error);
          // If offline or server unavailable, keep default role and continue
          userDoc = null;
        }

        if (userDoc && userDoc.exists()) {
          role = userDoc.data().role;
        } else {
          // Fallback to email-based role for existing users or OAuth
          role = getUserRole(firebaseUser.email);
          // Create the document with the determined role
          await setDoc(userDocRef, {
            email: firebaseUser.email,
            role: role,
            fullName: firebaseUser.displayName || '',
            phone: '',
            createdAt: new Date()
          });
        }

        // Map Firebase user to our app's user format
        const appUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: role,
          provider: firebaseUser.providerData[0]?.providerId || 'password'
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    signUp: async (data) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        // Update display name if provided
        if (data.fullName) {
          await updateProfile(userCredential.user, {
            displayName: data.fullName
          });
        }

        // Store user role in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: data.email,
          role: data.role || 'passenger',
          fullName: data.fullName || '',
          phone: data.phone || '',
          createdAt: new Date()
        });

        return { data: { user: userCredential.user }, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    signIn: async (data) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        return { data: { user: userCredential.user }, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    signInWithGoogle: async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return { data: { user: result.user }, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
    },

    signInWithGithub: async () => {
      try {
        const result = await signInWithPopup(auth, githubProvider);
        return { data: { user: result.user }, error: null };
      } catch (error) {
        // Provide more specific error messages for common issues
        let errorMessage = error.message;
        
        if (error.code === 'auth/account-exists-with-different-credential') {
          errorMessage = 'An account already exists with the same email but different sign-in method. Please sign in using the original method (email/password or Google).';
        } else if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = 'Sign-in was cancelled. Please try again.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.code === 'auth/unauthorized-domain') {
          errorMessage = 'This domain is not authorized for OAuth authentication. Please contact support.';
        } else if (error.code === 'auth/cancelled-popup-request') {
          errorMessage = 'Only one popup request is allowed at a time.';
        }
        
        console.error('GitHub sign-in error:', error.code, error.message);
        return { data: null, error: errorMessage };
      }
    },

    signOut: async () => {
      try {
        await firebaseSignOut(auth);
        return { error: null };
      } catch (error) {
        return { error: error.message };
      }
    },

    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

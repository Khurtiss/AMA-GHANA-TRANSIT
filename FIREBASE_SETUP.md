# Firebase Authentication Setup Guide

To enable real authentication with account management and OAuth (Google/GitHub), you need to set up a Firebase project.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "ama-ghana-transit")
4. Enable Google Analytics if desired
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in providers:
   - Email/Password
   - Google
   - GitHub

### For Google:
- Click on Google
- Enable it
- Add your project name and support email
- Save

### For GitHub:
- Click on GitHub
- Enable it
- You'll need to create a GitHub OAuth App first:
  - Go to GitHub Settings > Developer settings > OAuth Apps
  - Click "New OAuth App"
  - Fill in:
    - Application name: "AMA Ghana Transit"
    - Homepage URL: `http://localhost:3000` (for development) or your production URL
    - Authorization callback URL: `https://ama-ghana-transit.firebaseapp.com/__/auth/handler`
  - Create the app
- Copy the Client ID and Client Secret from GitHub
- Paste them into Firebase GitHub provider settings
- Save

## Step 3: Get Firebase Config

1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with name "AMA Ghana Transit Web"
5. Copy the config object (apiKey, authDomain, etc.)

## Step 4: Update Firebase Config

1. Create a local `.env` file in the project root. Do not commit or upload this file.
2. Add the Firebase web app values using the `REACT_APP_` prefix required by Create React App:

```text
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

The app reads these values from `src/utils/firebase.js`. Configure the same
variables in your hosting provider before creating a production build.

## Step 5: Deploy Rules (Optional)

For production, you may want to set up Firestore Security Rules, but for basic auth, the default rules are fine.

## Features Implemented

- ✅ Email/Password registration and login
- ✅ Google OAuth login/signup
- ✅ GitHub OAuth login/signup
- ✅ Persistent user sessions
- ✅ Role-based access (admin, operator, driver, passenger)
- ✅ Account management across sessions

## Testing

After setup, you can:
- Register with email/password
- Login with existing accounts
- Use Google/GitHub OAuth
- Users stay logged in across browser sessions
- Role assignment based on email patterns

## Security Notes

- Firebase handles password hashing and security
- OAuth providers handle their own security
- User data is stored securely in Firebase Auth
- No sensitive data is stored in localStorage anymore

## GitHub OAuth Troubleshooting

If GitHub login is not working, check the following:

### 1. GitHub OAuth App Configuration
- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Select your OAuth App
- Verify the **Authorization callback URL** matches exactly:
  ```
  https://ama-ghana-transit.firebaseapp.com/__/auth/handler
  ```
- For local testing, also add: `http://localhost:3000`

### 2. Firebase GitHub Provider Settings
- In Firebase Console → Authentication → Sign-in method → GitHub
- Verify Client ID and Client Secret are correctly entered
- Make sure the provider is **Enabled**

### 3. Common Error Codes
| Error Code | Meaning | Solution |
|------------|---------|----------|
| `auth/unauthorized-domain` | Domain not authorized | Add your domain in Firebase Console → Authentication → Settings → Authorized domains |
| `auth/popup-closed-by-user` | User closed popup | Ask user to allow popups for the site |
| `auth/account-exists-with-different-credential` | Email already registered with another method | User should use original sign-in method |
| `auth/network-request-failed` | Network issue | Check internet connection |

### 4. Authorized Domains
In Firebase Console:
1. Go to Authentication → Settings
2. Under "Authorized domains", ensure these are listed:
   - `localhost` (for development)
   - `ama-ghana-transit.firebaseapp.com`
   - Your custom domain (if configured)
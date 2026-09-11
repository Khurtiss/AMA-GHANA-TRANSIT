# Deploying AMA GHANA TRANSIT

To host your project for free so your lecturer can review it, follow these steps:

## 1. Using Vercel (Recommended & Free)
Vercel is the easiest platform for React projects.

1.  **Push your code to GitHub**: Create a repository and upload your files.
2.  **Go to [vercel.com](https://vercel.com/)**: Sign up with your GitHub account.
3.  **Click "Add New" → "Project"**: Select your repository.
4.  **Configuration**:
    - **Framework Preset**: Vite (it will detect it automatically).
    - **Root Directory**: `./`
5.  **Environment Variables**: Ensure you add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if you are using Supabase.
6.  **Click Deploy**: It will give you a link like `ama-ghana-transit.vercel.app`.

## 2. Using Netlify
Netlify is also a great free alternative.

1.  **Login to [netlify.com](https://www.netlify.com/)**.
2.  **Drag and Drop**: You can literally drag and drop your `dist` folder (after running `npm run build`) into the Netlify dashboard.
3.  **Site link**: It will generate a link for you immediately.

## 3. Handing in as a Project
If you need to hand in a folder that works without internet hosting:
1.  Run `npm run build`.
2.  Zip the `dist` folder.
3.  Your lecturer can open `index.html` inside the `dist` folder (since we are now using `HashRouter`, it will work even from a local file).

> [!NOTE]
> We have switched to `HashRouter` to ensure navigation works perfectly on all free hosting platforms and even when opening the project locally.

# Music Library - Micro Frontend Application

A modern music library app built with React that uses micro frontend architecture. The app has two user types - admins who can manage songs and regular users who can only browse and search.

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Demo Credentials
- **Admin**: `admin` / `admin123` (can add/delete songs)
- **User**: `user` / `user123` (view only)

### Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   git clone <repository-url>
   cd my-react-app
   pnpm install
   ```

2. **Start Micro Frontend** (Terminal 1)
   ```bash
   cd music-library-mf
   pnpm install
   pnpm dev
   ```
   This runs the music library on `http://localhost:3001`

3. **Start Main Application** (Terminal 2)
   ```bash
   pnpm dev
   ```
   This runs the main app on `http://localhost:3000`

4. **Access the App**
   - Open `http://localhost:3000`
   - Login with demo credentials above
   - Try both admin and user accounts to see different features

## 🌐 How I Deployed It

I deployed this app using **Vercel** (a popular hosting platform for React apps). **Important**: Deploy the micro frontend first, then the main app.

### Step 1: Deploy Micro Frontend First
1. **Connected to GitHub**: Went to [vercel.com](https://vercel.com) and signed in with GitHub
2. **Created New Project**: Clicked "New Project" → "Import Git Repository"
3. **Selected Repository**: Chose this GitHub repository
4. **Configured Settings**:
   - **Root Directory**: `music-library-mf` (change from root to this folder)
   - **Framework**: Vite (auto-detected)
   - **Build Command**: `pnpm build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
5. **Deployed**: Clicked "Deploy" and got URL like `https://your-microfrontend-name.vercel.app`
6. **Saved the URL**: Copied this URL - you'll need it for the main app

### Step 2: Deploy Main App
1. **Created Another Project**: In Vercel dashboard, clicked "New Project" again
2. **Selected Same Repository**: Chose the same GitHub repository
3. **Configured Settings**:
   - **Root Directory**: Left as root (main app is in the root folder)
   - **Framework**: Vite (auto-detected)
   - **Build Command**: `pnpm build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
4. **Deployed**: Clicked "Deploy" and got URL like `https://your-main-app-name.vercel.app`

### Step 3: Connect Both Apps
After both deployments, I updated the main app's `vite.config.ts` file with the micro frontend URL:
```typescript
const MICROFRONTEND_URL = 'https://your-microfrontend-name.vercel.app';
```

Then I redeployed the main app so it knows where to find the music library.

**Why this order matters**: The main app needs to know the micro frontend's URL before it can load it properly.

## 🏗️ How Micro Frontend Works

Think of it like this: Instead of building one big app, I split it into two smaller apps that work together.

### The Two Apps
1. **Main App** (Container): Handles login, user management, and loads the music library
2. **Music Library App** (Micro Frontend): Just handles the music browsing, searching, and management

### How They Connect
- The main app loads the music library app from a different URL
- They share the same React framework but run independently
- The main app passes user information (like admin status) to the music library
- If the music library isn't available, the main app shows a helpful error message

### Why This Approach?
- **Independent Development**: Each app can be developed and deployed separately
- **Reusability**: The music library could be used in other apps
- **Scalability**: Different teams can work on different parts
- **Performance**: Only load what you need

## 🔐 How Role-Based Authentication Works

The app has two types of users with different permissions:

### User Types
- **Admin**: Can add new songs and delete existing ones
- **User**: Can only view, search, and browse songs

### How It Works
1. **Login Process**: When you log in, the app checks your username/password against a simple list
2. **Role Assignment**: Based on your credentials, you get assigned either "admin" or "user" role
3. **Permission Checking**: The app remembers your role and shows/hides features accordingly
4. **UI Updates**: Admin users see add/delete buttons, regular users don't

### Simple Example
```typescript
// When you log in, the app checks:
if (username === 'admin' && password === 'admin123') {
  userRole = 'admin';  // Can add/delete songs
} else if (username === 'user' && password === 'user123') {
  userRole = 'user';   // Can only view songs
}
```

### What You See Based on Your Role
- **Admin Login**: 
  - See "Add New Song" button
  - See delete buttons on each song
  - Can access all features
- **User Login**:
  - No add/delete buttons
  - Can only search and browse
  - Cleaner, simpler interface

## 🎵 Music Library Features

### Search & Filter
- **Search**: Type in the search box to find songs by title, artist, album, or genre
- **Sort**: Click column headers to sort by title, artist, album, or year
- **Real-time**: Results update as you type

### Admin Features (Admin Only)
- **Add Songs**: Click "Add New Song" to add tracks to the library
- **Delete Songs**: Click the trash icon to remove songs
- **Full Control**: Manage the entire music collection

### User Features (All Users)
- **Browse**: View all songs in a clean grid layout
- **Search**: Find specific songs quickly
- **Sort**: Organize songs by different criteria
- **Statistics**: See total songs, artists, and albums

## 🛠️ Technical Stack

- **React 19**: Modern JavaScript framework
- **TypeScript**: Adds type safety to JavaScript
- **Tailwind CSS**: Makes styling easier and more consistent
- **Vite**: Fast build tool and development server
- **Module Federation**: Connects the two apps together

## 📱 Responsive Design

The app works on all devices:
- **Mobile Phones**: Optimized for small screens
- **Tablets**: Touch-friendly interface
- **Desktop**: Full feature set with keyboard shortcuts

## 🧪 Testing the App

Try these scenarios to see how everything works:

1. **Login as Admin**:
   - Use `admin` / `admin123`
   - Notice the add/delete buttons
   - Try adding a new song
   - Try deleting a song

2. **Login as User**:
   - Use `user` / `user123`
   - Notice no add/delete buttons
   - Try searching for songs
   - Try sorting by different fields

3. **Test Search**:
   - Type "rock" to find rock songs
   - Type an artist name
   - Type an album name

4. **Test Logout**:
   - Click the logout button in the top-right
   - Notice you're redirected to login
   - All your session data is cleared

## 🎯 What Makes This Special

- **Micro Frontend Architecture**: Two apps working as one
- **Role-Based Security**: Different features for different users
- **Real-time Search**: Find songs instantly
- **Responsive Design**: Works on any device
- **Easy Deployment**: Simple Vercel setup
- **Modern Tech**: Uses latest React and TypeScript

## 🚨 Troubleshooting

### If Music Library Doesn't Load
1. Make sure both apps are running (check both terminals)
2. Check that `http://localhost:3001` is accessible
3. Refresh the main app page
4. Check browser console for errors

### If Login Doesn't Work
1. Make sure you're using the exact credentials:
   - Admin: `admin` / `admin123`
   - User: `user` / `user123`
2. Check for typos in username/password
3. Try refreshing the page

### If Deployment Fails
1. Check that both Vercel projects are deployed successfully
2. Verify the micro frontend URL in `vite.config.ts`
3. Make sure both apps are using the same repository
4. Check Vercel build logs for errors

---

**Ready to explore your music library! 🎵**
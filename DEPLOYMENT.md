# Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
# Terminal 1 - Start Micro Frontend
cd music-library-mf
pnpm install
pnpm dev

# Terminal 2 - Start Main App
cd ..
pnpm install
pnpm dev
```

### Demo Credentials
- **Admin**: `admin` / `admin123` (can add/delete songs)
- **User**: `user` / `user123` (view only)

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Deploy Main App
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: `18`
3. Add environment variable: `NODE_VERSION=18`
4. Deploy

#### Deploy Micro Frontend
1. Create a new Netlify site
2. Set build settings:
   - Build command: `cd music-library-mf && pnpm build`
   - Publish directory: `music-library-mf/dist`
   - Node version: `18`
3. Add CORS headers in `netlify.toml`
4. Deploy

#### Update Remote URL
After both deployments, update the micro frontend URL in `vite.config.ts`:
```typescript
remotes: {
  musicLibrary: 'https://your-microfrontend-site.netlify.app/assets/music-library.js',
}
```

### Option 2: Vercel

#### Deploy Main App
```bash
vercel --prod
```

#### Deploy Micro Frontend
```bash
cd music-library-mf
vercel --prod
```

#### Update Remote URL
Update the micro frontend URL in `vite.config.ts` with the Vercel deployment URL.

### Option 3: GitHub Pages

#### Deploy Main App
1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/music-library-app",
  "scripts": {
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Deploy:
```bash
pnpm deploy
```

#### Deploy Micro Frontend
1. Create separate repository for micro frontend
2. Follow similar GitHub Pages setup
3. Update remote URL in main app

## 🔧 Environment Configuration

### Development
- Main App: `http://localhost:3000`
- Micro Frontend: `http://localhost:3001`

### Production
Update `vite.config.ts` with production URLs:
```typescript
remotes: {
  musicLibrary: 'https://your-production-domain.com/assets/music-library.js',
}
```

## 📱 Mobile Testing

The application is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

Test on different screen sizes using browser dev tools.

## 🧪 Testing Checklist

### Authentication
- [ ] Login with admin credentials
- [ ] Login with user credentials
- [ ] Logout functionality
- [ ] Session persistence

### Role-based Access
- [ ] Admin can see add/delete buttons
- [ ] User cannot see add/delete buttons
- [ ] UI updates based on role

### Music Library Features
- [ ] Search functionality works
- [ ] Sort by different fields
- [ ] Group by album/artist/genre
- [ ] Statistics calculation
- [ ] Add new songs (admin only)
- [ ] Delete songs (admin only)

### Micro Frontend Integration
- [ ] Micro frontend loads correctly
- [ ] Error handling works
- [ ] Fallback states display properly

## 🐛 Troubleshooting

### Common Issues

1. **Micro Frontend Not Loading**
   - Check if micro frontend is running on port 3001
   - Verify CORS settings
   - Check browser console for errors

2. **Authentication Issues**
   - Clear localStorage
   - Check JWT token validity
   - Verify user credentials

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

4. **Module Federation Issues**
   - Ensure both apps are built with compatible versions
   - Check shared dependencies
   - Verify remote URL is correct

### Debug Mode

Enable debug mode by adding to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📊 Performance Optimization

### Build Optimization
- Code splitting is enabled
- Lazy loading for micro frontend
- Tree shaking for unused code
- Minification for production builds

### Runtime Optimization
- Memoized calculations using useMemo
- Efficient re-renders with React.memo
- Lazy loading of components
- Optimized bundle sizes

## 🔒 Security Considerations

### Authentication
- JWT tokens expire after 24 hours
- Tokens are stored in localStorage
- Role-based access control
- Protected routes

### CORS
- Configured for cross-origin requests
- Proper headers for micro frontend communication
- Secure token handling

## 📈 Monitoring

### Error Tracking
- Console error logging
- User-friendly error messages
- Fallback UI states

### Performance Monitoring
- Bundle size analysis
- Load time optimization
- Memory usage tracking

## 🎯 Success Criteria

The application meets all requirements:
- ✅ Music Library UI with clean design
- ✅ Filter, sort, and group by features
- ✅ JavaScript map, filter, reduce methods
- ✅ Micro Frontend Architecture
- ✅ JWT Authentication with roles
- ✅ Role-based UI controls
- ✅ Responsive design
- ✅ Deployment ready

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the README.md
3. Check browser console for errors
4. Verify all dependencies are installed
5. Ensure both applications are running

---

**Ready to deploy! 🚀**

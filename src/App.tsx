import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import './App.css';

const MusicLibrary = lazy(() => import('./components/MusicLibraryWrapper'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Layout>
              <Suspense fallback={<div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>}>
                <MusicLibrary />
              </Suspense>
            </Layout>
          </AuthGuard>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

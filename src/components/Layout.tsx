import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Music, LogOut, User, Crown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Music className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Music Library</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  {isAdmin ? (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <User className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user?.username}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isAdmin 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role}
                  </span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MusicLibrary from './components/MusicLibrary';

export { default as MusicLibrary } from './components/MusicLibrary';
export type { Song, SortField, GroupByField, SortOrder } from './types';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="min-h-screen bg-gray-50">
        <div className="">
          <MusicLibrary isAdmin={true} />
        </div>
      </div>
    </React.StrictMode>
  );
}

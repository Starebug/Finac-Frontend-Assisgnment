import React, { useState, useMemo } from 'react';
import { Song, SortField, SortOrder } from '../types';
import { mockSongs } from '../data/mockSongs';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Plus, 
  Trash2, 
  Music
} from 'lucide-react';

interface MusicLibraryProps {
  isAdmin?: boolean;
  onAddSong?: (song: Omit<Song, 'id'>) => void;
  onDeleteSong?: (id: string) => void;
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ 
  isAdmin = false, 
  onAddSong, 
  onDeleteSong 
}) => {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: ''
  });


  const filteredSongs = useMemo(() => {
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredSongs, sortField, sortOrder]);


  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddSong) {
      onAddSong(newSong);
    } else {
      const song: Song = {
        ...newSong,
        id: Date.now().toString()
      };
      setSongs(prev => [...prev, song]);
    }
    setNewSong({
      title: '',
      artist: '',
      album: '',
      year: new Date().getFullYear(),
      genre: '',
      duration: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteSong = (id: string) => {
    if (onDeleteSong) {
      onDeleteSong(id);
    } else {
      setSongs(prev => prev.filter(song => song.id !== id));
    }
  };

  const handleDeleteClick = (song: Song) => {
    setSongToDelete(song);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (songToDelete) {
      handleDeleteSong(songToDelete.id);
      setShowDeleteConfirm(false);
      setSongToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSongToDelete(null);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col overflow-y-auto">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Music Library</h1>
          </div>
          <div className="flex items-center space-x-6">
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Track</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-8">
          {showAddForm && (
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Add New Track</h3>
              <form onSubmit={handleAddSong} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.title}
                    onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter track title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Artist</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.artist}
                    onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
                    placeholder="Enter artist name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Album</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.album}
                    onChange={(e) => setNewSong(prev => ({ ...prev, album: e.target.value }))}
                    placeholder="Enter album name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.year}
                    onChange={(e) => setNewSong(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    placeholder="2023"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.genre}
                    onChange={(e) => setNewSong(prev => ({ ...prev, genre: e.target.value }))}
                    placeholder="Pop, Hip-Hop, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (mm:ss)</label>
                  <input
                    type="text"
                    required
                    pattern="\d+:\d{2}"
                    placeholder="3:45"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newSong.duration}
                    onChange={(e) => setNewSong(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Add Track
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tracks..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                {(['title', 'artist', 'album', 'year'] as SortField[]).map(field => (
                  <button
                    key={field}
                    onClick={() => toggleSort(field)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortField === field
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline" /> : <SortDesc className="h-3 w-3 inline" />}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Related Tracks */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Related tracks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedSongs.map((song) => (
                <div key={song.id} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors group">
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Music className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {song.genre.toUpperCase()}
                      </span>
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
                      {song.title}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">Producer • {song.artist}</p>
                    <p className="text-sm text-gray-500">{song.year} • {song.duration}</p>
                    
                    {isAdmin && (
                      <div className="flex items-center justify-end pt-2">
                        <button
                          onClick={() => handleDeleteClick(song)}
                          className="group relative p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                          title="Delete track"
                        >
                          <Trash2 className="h-4 w-4" />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Delete Track
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

          {sortedSongs.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-6">
                <Music className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tracks found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filter criteria to find the music you're looking for.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && songToDelete && (
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Delete Track</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-white">"{songToDelete.title}"</span> by <span className="font-semibold text-white">{songToDelete.artist}</span>?
                </p>
                
                <p className="text-sm text-gray-400 mb-6">
                  This action cannot be undone.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete Track
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default MusicLibrary;

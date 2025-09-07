import React, { useState, useMemo } from 'react';
import { Song, SortField, GroupByField, SortOrder } from '../types';
import { mockSongs } from '../data/mockSongs';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Plus, 
  Trash2, 
  Music, 
  Clock,
  User,
  Disc
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
  const [groupBy, setGroupBy] = useState<GroupByField | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const groupedSongs = useMemo(() => {
    if (!groupBy) return { 'All Songs': sortedSongs };
    
    return sortedSongs.reduce((groups, song) => {
      const key = song[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {} as Record<string, Song[]>);
  }, [sortedSongs, groupBy]);

  const stats = useMemo(() => {
    return songs.reduce((acc, song) => {
      acc.totalSongs++;
      acc.totalDuration += parseFloat(song.duration.replace(':', '.'));
      acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1;
      acc.artists[song.artist] = (acc.artists[song.artist] || 0) + 1;
      return acc;
    }, {
      totalSongs: 0,
      totalDuration: 0,
      genres: {} as Record<string, number>,
      artists: {} as Record<string, number>
    });
  }, [songs]);

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

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Music Library</h2>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Song</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Total Songs</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalSongs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Duration</p>
                <p className="text-3xl font-bold text-blue-900">
                  {Math.floor(stats.totalDuration / 60)}h {Math.round(stats.totalDuration % 60)}m
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-lg">
                <Disc className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Genres</p>
                <p className="text-3xl font-bold text-green-900">
                  {Object.keys(stats.genres).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-500 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Artists</p>
                <p className="text-3xl font-bold text-orange-900">
                  {Object.keys(stats.artists).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Song Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Song</h3>
          <form onSubmit={handleAddSong} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.title}
                onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.artist}
                onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.album}
                onChange={(e) => setNewSong(prev => ({ ...prev, album: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.year}
                onChange={(e) => setNewSong(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.genre}
                onChange={(e) => setNewSong(prev => ({ ...prev, genre: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mm:ss)</label>
              <input
                type="text"
                required
                pattern="\d+:\d{2}"
                placeholder="3:45"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newSong.duration}
                onChange={(e) => setNewSong(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search songs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Sort Controls */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="flex flex-wrap gap-2">
                {(['title', 'artist', 'album', 'year'] as SortField[]).map(field => (
                  <button
                    key={field}
                    onClick={() => toggleSort(field)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      sortField === field
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="capitalize">{field}</span>
                    {sortField === field && (
                      sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Group By */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Group by:</span>
              <select
                value={groupBy || ''}
                onChange={(e) => setGroupBy(e.target.value as GroupByField | null || null)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">None</option>
                <option value="album">Album</option>
                <option value="artist">Artist</option>
                <option value="genre">Genre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-6">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName} className="bg-white rounded-lg shadow">
            {groupBy && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
                <p className="text-sm text-gray-500">{groupSongs.length} songs</p>
              </div>
            )}
            
            <div className="divide-y divide-gray-100">
              {groupSongs.map((song) => (
                <div key={song.id} className="px-6 py-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-14 w-14 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <Music className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                            {song.title}
                          </h4>
                          <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">{song.artist}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {song.album}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              {song.year}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              {song.genre}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              <Clock className="h-3 w-3 mr-1" />
                              {song.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteSong(song.id)}
                        className="ml-4 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        title="Delete song"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(groupedSongs).length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
            <Music className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No songs found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Try adjusting your search terms or filter criteria to find the music you're looking for.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Clear Search
            </button>
            <button
              onClick={() => setGroupBy(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;

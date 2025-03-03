import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import searchService from './SearchService';

const Search = ({ data, onSelectSong, onSelectArtist, onSearch, searchTerm }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: []
  });
  const [showResults, setShowResults] = useState(false);
  
  // Cập nhật searchText khi searchTerm từ prop thay đổi
  useEffect(() => {
    if (searchTerm !== undefined && searchTerm !== searchText) {
      setSearchText(searchTerm);
      // Thực hiện tìm kiếm mới nếu có searchTerm
      if (searchTerm) {
        const results = searchService(data, searchTerm);
        setSearchResults(results);
        setShowResults(true);
      }
    }
  }, [searchTerm, data]);
  
  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  
  // Xử lý xoá input
  const handleClearInput = () => {
    setSearchText('');
    setShowResults(false);
    setSearchResults({
      songs: [],
      artists: []
    });
  };
  
  // Xử lý khi ấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      const results = searchService(data, searchText);
      setSearchResults(results);
      setShowResults(true);
      
      // Thêm vào lịch sử tìm kiếm
      if (onSearch) {
        onSearch(searchText);
      }
    }
  };

  // Xử lý khi chọn bài hát
  const handleSongSelect = (song) => {
    if (onSelectSong) {
      onSelectSong(song);
      setShowResults(false);
      
      // Thêm vào lịch sử tìm kiếm khi chọn bài hát
      if (onSearch) {
        onSearch(searchText);
      }
    }
  };

  // Xử lý khi chọn ca sĩ
  const handleArtistSelect = (artist) => {
    if (onSelectArtist) {
      onSelectArtist(artist);
      setShowResults(false);
      
      // Thêm vào lịch sử tìm kiếm khi chọn ca sĩ
      if (onSearch) {
        onSearch(searchText);
      }
    }
  };
  
  return (
    <div className="flex-grow px-4 relative">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={searchText}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          className="w-full p-2 rounded-full bg-[#2D2D2D] text-white placeholder-gray-100 focus:outline-none focus:bg-gray-700 pr-8"
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        {searchText && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white rounded-full hover:bg-gray-700"
            onClick={handleClearInput}
          >
            <IoClose />
          </button>
        )}
      </div>
      
      {/* Hiển thị kết quả tìm kiếm */}
      {showResults && (
        <div className="absolute top-12 left-0 w-full max-w-2xl bg-[#2D2D2D] text-white p-4 rounded-lg z-50 shadow-lg">
          <h3 className="text-xl mb-3">Kết quả tìm kiếm</h3>
          
          {/* Kết quả bài hát */}
          {searchResults.songs.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg mb-2">Bài hát</h4>
              <div className="flex flex-col gap-2">
                {searchResults.songs.map(song => (
                  <div 
                    key={song.id} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => handleSongSelect(song)}
                  >
                    <img src={song.img} alt={song.name} className="w-12 h-12 rounded" />
                    <div>
                      <p className="font-medium">{song.name}</p>
                      <p className="text-sm text-gray-300">
                        {data.artists.find(artist => artist.id === song.artistId)?.name || 'Unknown Artist'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Kết quả ca sĩ */}
          {searchResults.artists.length > 0 && (
            <div>
              <h4 className="text-lg mb-2">Ca sĩ</h4>
              <div className="flex flex-col gap-2">
                {searchResults.artists.map(artist => (
                  <div 
                    key={artist.id} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => handleArtistSelect(artist)}
                  >
                    <img src={artist.img} alt={artist.name} className="w-12 h-12 rounded-full" />
                    <p className="font-medium">{artist.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Không có kết quả */}
          {searchResults.songs.length === 0 && searchResults.artists.length === 0 && (
            <p>Không tìm thấy kết quả phù hợp với &quot;{searchText}&quot;</p>
          )}
        </div>
      )}
    </div>
  );
};

// Thêm prop-types validation
Search.propTypes = {
  data: PropTypes.shape({
    songs: PropTypes.array.isRequired,
    artists: PropTypes.array.isRequired,
    chill: PropTypes.array,
    MPH: PropTypes.array
  }).isRequired,
  onSelectSong: PropTypes.func,
  onSelectArtist: PropTypes.func,
  onSearch: PropTypes.func,
  searchTerm: PropTypes.string
};

export default Search;
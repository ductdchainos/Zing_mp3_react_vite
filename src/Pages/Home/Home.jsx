import { useState, useEffect } from 'react';
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [chill, setChill] = useState([]);
  const [MPH, setMPH] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  // Thêm state mới để theo dõi trạng thái tải dữ liệu
  const [dataLoaded, setDataLoaded] = useState({
    songs: false,
    artists: false,
    chill: false,
    mph: false
  });
  
  useEffect(() => {
    // Lấy dữ liệu từ json-server
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Tải dữ liệu songs
        const songsResponse = await fetch('http://localhost:3001/songs');
        if (!songsResponse.ok) throw new Error('Network response was not ok for songs');
        const songsData = await songsResponse.json();
        setSongs(songsData);
        setDataLoaded(prev => ({...prev, songs: true}));
        
        // Tải dữ liệu artists
        const artistsResponse = await fetch('http://localhost:3001/artists');
        if (!artistsResponse.ok) throw new Error('Network response was not ok for artists');
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);
        setDataLoaded(prev => ({...prev, artists: true}));
        
        // Tải dữ liệu chill
        const chillResponse = await fetch('http://localhost:3001/chill');
        if (!chillResponse.ok) throw new Error('Network response was not ok for chill');
        const chillData = await chillResponse.json();
        setChill(chillData);
        setDataLoaded(prev => ({...prev, chill: true}));
        
        // Tải dữ liệu MPH
        const mphResponse = await fetch('http://localhost:3001/MPH');
        if (!mphResponse.ok) throw new Error('Network response was not ok for MPH');
        const mphData = await mphResponse.json();
        setMPH(mphData);
        setDataLoaded(prev => ({...prev, mph: true}));
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Thêm hàm tìm nghệ sĩ an toàn
  const findArtist = (artistId) => {
    // Kiểm tra nếu mảng artists tồn tại và có dữ liệu
    if (!artists || artists.length == 0) return null;
    
    // Tìm nghệ sĩ theo ID
    const artist = artists.find(artist => artist.id == artistId);
    return artist; 
  };

  const getArtistName = (artistId) => {
    const artist = findArtist(artistId);
    return artist ? artist.name : 'Ca sĩ chưa tải';
  };

  const getSongById = (id) => {
    return songs.find(song => song.id === id);
  };

  // Hàm lấy danh sách bài hát cho phần Chill
  const getChillSongs = () => {
    return chill.map(item => {
      const song = getSongById(item.songId);
      return song;
    }).filter(song => song); // Lọc ra các bài hát tồn tại
  };

  // Hàm lấy danh sách bài hát cho phần MPH
  const getMPHSongs = () => {
    return MPH.map(item => {
      const song = getSongById(item.songId);
      return song;
    }).filter(song => song); // Lọc ra các bài hát tồn tại
  };

  const handleSelectSong = (song) => {
    console.log("Bài hát được chọn:", song);
    setSelectedSong(song);
    setIsPlaying(true);
    // Tìm index của bài hát trong danh sách
    const index = songs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
    }
    // Đặt lại lựa chọn nghệ sĩ khi một bài hát được chọn
    setSelectedArtist(null);
    // Cuộn đến phần chi tiết bài hát
    setTimeout(() => {
      document.getElementById('songDetail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectArtist = (artist) => {
    console.log("Nghệ sĩ được chọn:", artist);
    setSelectedArtist(artist);
    // Đặt lại lựa chọn bài hát khi một nghệ sĩ được chọn
    setSelectedSong(null);
    // Cuộn đến phần chi tiết nghệ sĩ
    setTimeout(() => {
      document.getElementById('artistDetail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setSelectedSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setSelectedSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  // Kiểm tra xem tất cả dữ liệu cần thiết đã tải xong chưa
  const allDataLoaded = dataLoaded.songs && dataLoaded.artists;

  // Chuẩn bị dữ liệu cho Footer
  const currentSongWithArtist = selectedSong && allDataLoaded ? {
    ...selectedSong,
    artist: getArtistName(selectedSong.artistId)
  } : null;

  // Hàm xóa trạng thái đã chọn và quay lại trang chủ
  const handleBackToHome = () => {
    setSelectedSong(null);
    setSelectedArtist(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#170f23] text-white">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#170f23] text-white min-h-screen">
      {/* Header Component */}
      <Header 
        onSelectSong={handleSelectSong} 
        onSelectArtist={handleSelectArtist} 
      />

      <main className="w-full pt-16 px-4 pb-20">  
        {/* Khi có bài hát đã chọn, chỉ hiển thị chi tiết bài hát */}
        {selectedSong && (
          <>
            <button 
              onClick={handleBackToHome}
              className="mb-4 px-4 py-2 bg-[#2D2D2D] rounded-lg hover:bg-[#3D3D3D]"
            >
              ← Quay lại
            </button>
            <section id="songDetail" className="mb-8 p-6 bg-[#2D2D2D] rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={selectedSong.img} 
                    alt={selectedSong.name} 
                    className="w-64 h-64 object-cover rounded-lg shadow-lg" 
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedSong.name}</h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {getArtistName(selectedSong.artistId)}
                    </p>
                    {selectedSong.lyric && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Lời bài hát</h3>
                        <div className="whitespace-pre-line max-h-40 overflow-y-auto">
                          {selectedSong.lyric}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Khi có nghệ sĩ đã chọn, chỉ hiển thị chi tiết nghệ sĩ */}
        {selectedArtist && (
          <>
            <button 
              onClick={handleBackToHome}
              className="mb-4 px-4 py-2 bg-[#2D2D2D] rounded-lg hover:bg-[#3D3D3D]"
            >
              ← Quay lại
            </button>
            <section id="artistDetail" className="mb-8 p-6 bg-[#2D2D2D] rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={selectedArtist.img} 
                    alt={selectedArtist.name} 
                    className="w-64 h-64 object-cover rounded-full shadow-lg" 
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">{selectedArtist.name}</h2>
                  {/* Bài hát của nghệ sĩ */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Bài hát của nghệ sĩ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {songs
                        .filter(song => song.artistId === selectedArtist.id)
                        .map(song => (
                          <div 
                            key={song.id} 
                            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                            onClick={() => handleSelectSong(song)}
                          >
                            <img src={song.img} alt={song.name} className="w-12 h-12 rounded" />
                            <div>
                              <p className="font-medium">{song.name}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Hiển thị trang chủ chỉ khi không có bài hát hoặc nghệ sĩ được chọn */}
        {!selectedSong && !selectedArtist && (
          <>
            {/* Phần Gợi Ý Cho Bạn */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Gợi Ý Cho Bạn</h2>
              <div className="flex space-x-4 overflow-x-auto">
                {songs.map(song => (
                  <div 
                    key={song.id} 
                    className="album flex-shrink-0 w-48 cursor-pointer"
                    onClick={() => handleSelectSong(song)}
                  >
                    <img src={song.img} alt={song.name} className="w-full h-48 object-cover rounded-lg" />
                    <div className="text-center mt-2">{song.name}</div>
                    <div className="text-center text-sm text-gray-300">
                      {getArtistName(song.artistId)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Phần Chill - Sử dụng logic từ DB */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Chill</h2>
              <div className="flex space-x-4 overflow-x-auto">
                {getChillSongs().map(song => (
                  <div 
                    key={song.id} 
                    className="album flex-shrink-0 w-48 cursor-pointer"
                    onClick={() => handleSelectSong(song)}
                  >
                    <img src={song.img} alt={song.name} className="w-full h-48 object-cover rounded-lg" />
                    <div className="text-center mt-2">{song.name}</div>
                    <div className="text-center text-sm text-gray-300">
                      {getArtistName(song.artistId)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Phần Mới Phát Hành - Sử dụng logic từ DB */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Mới Phát Hành</h2>
              <div className="flex space-x-4 overflow-x-auto">
                {getMPHSongs().map(song => (
                  <div 
                    key={song.id} 
                    className="album flex-shrink-0 w-48 cursor-pointer"
                    onClick={() => handleSelectSong(song)}
                  >
                    <img src={song.img} alt={song.name} className="w-full h-48 object-cover rounded-lg" />
                    <div className="text-center mt-2">{song.name}</div>
                    <div className="text-center text-sm text-gray-300">
                      {getArtistName(song.artistId)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nghệ sĩ */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Nghệ Sĩ</h2>
              <div className="flex space-x-4 overflow-x-auto">
                {artists.map(artist => (
                  <div 
                    key={artist.id} 
                    className="artist flex-shrink-0 w-48 cursor-pointer"
                    onClick={() => handleSelectArtist(artist)}
                  >
                    <img src={artist.img} alt={artist.name} className="w-full h-48 object-cover rounded-full" />
                    <div className="text-center mt-2">{artist.name}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer với thanh điều khiển phát nhạc */}
      {selectedSong && currentSongWithArtist && (
        <Footer 
          currentSong={currentSongWithArtist}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          onNext={playNextSong}
          onPrevious={playPreviousSong}
        />
      )}
    </div>
  );
};

export default Home;
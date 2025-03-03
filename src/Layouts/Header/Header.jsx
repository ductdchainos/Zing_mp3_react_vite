import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Search from './Search';
import PropTypes from 'prop-types';

const Header = ({ onSelectSong, onSelectArtist }) => {
  // Thêm state cho lịch sử tìm kiếm và vị trí hiện tại
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const [isActive, setIsActive] = useState(false); // Giữ lại state này để kiểm soát trạng thái nút
  const [data, setData] = useState({
    songs: [],
    artists: [],
  });
  
  useEffect(() => {
    // Lấy dữ liệu từ json-server đang chạy ở port 3001
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/songs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const songs = await response.json();
        
        const response1 = await fetch('http://localhost:3001/artists');
        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }
        const artists = await response1.json();
        
        setData({
          songs: songs,
          artists: artists
        });
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        // Nếu có lỗi, sử dụng dữ liệu mặc định
        setData({
          songs: [],
          artists: []
        });
      }
    };
    
    fetchData();
    
    // Reset lịch sử tìm kiếm khi load trang
    setSearchHistory([]);
    setCurrentPosition(-1);
    setIsActive(false); // Đảm bảo nút không active khi mới tải trang
  }, []); // Loại bỏ data từ dependency để tránh vòng lặp vô hạn

  // Cập nhật trạng thái active của nút điều hướng mỗi khi lịch sử tìm kiếm thay đổi
  useEffect(() => {
    // Nếu có ít nhất 1 phần tử trong lịch sử, kích hoạt nút
    if (searchHistory.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    
    console.log("History updated:", searchHistory); // Log để debug
  }, [searchHistory]);

  // Hàm thêm từ khóa tìm kiếm vào lịch sử
  const handleAddToHistory = (searchTerm) => {
    console.log("Adding to history:", searchTerm); // Log để debug
    
    // Chỉ thêm vào nếu từ khóa không trống
    if (!searchTerm || !searchTerm.trim()) {
      console.log("Empty search term, not adding to history");
      return;
    }
    
    // Tạo lịch sử mới bằng cách cắt bỏ phần lịch sử sau vị trí hiện tại (nếu có)
    const newHistory = [...searchHistory.slice(0, currentPosition + 1), searchTerm];
    
    // Cập nhật lịch sử và vị trí hiện tại
    setSearchHistory(newHistory);
    setCurrentPosition(newHistory.length - 1);
    
    // Đảm bảo nút được kích hoạt
    setIsActive(true);
    
    console.log("New history:", newHistory);
    console.log("New position:", newHistory.length - 1);
  };

  // Hàm quay lại tìm kiếm trước đó
  const goBack = () => {
    if (currentPosition > 0) {
      const newPosition = currentPosition - 1;
      setCurrentPosition(newPosition);
      console.log("Going back to position:", newPosition);
    }
  };

  // Hàm đi đến tìm kiếm tiếp theo
  const goForward = () => {
    if (currentPosition < searchHistory.length - 1) {
      const newPosition = currentPosition + 1;
      setCurrentPosition(newPosition);
      console.log("Going forward to position:", newPosition);
    }
  };

  // Kiểm tra xem có thể đi lùi/tiến được không
  const canGoBack = currentPosition > 0;
  const canGoForward = currentPosition < searchHistory.length - 1;
  
  console.log("Current state:", { isActive, canGoBack, canGoForward, currentPosition, historyLength: searchHistory.length });

  return (
    <header className="fixed top-0 left-64 right-0 bg-[#170f23] border-b border-[#393243] flex items-center px-4 p-4 shadow-md z-50">
      <div className="flex items-center space-x-4">
        <button 
          className={`text-white p-2 rounded-full cursor-pointer ${isActive && canGoBack ? 'opacity-100 hover:bg-gray-700' : 'opacity-30'}`}
          onClick={goBack}
          disabled={!isActive || !canGoBack}
        >
          <FaArrowLeft />
        </button>
        <button 
          className={`text-white p-2 rounded-full cursor-pointer ${isActive && canGoForward ? 'opacity-100 hover:bg-gray-700' : 'opacity-30'}`}
          onClick={goForward}
          disabled={!isActive || !canGoForward}
        >
          <FaArrowRight />
        </button>
      </div>
      
      {/* Sử dụng component tìm kiếm với dữ liệu từ json-server */}
      <Search 
        data={data} 
        onSelectSong={onSelectSong} 
        onSelectArtist={onSelectArtist}
        onSearch={handleAddToHistory}
        searchTerm={currentPosition >= 0 ? searchHistory[currentPosition] : ''}
      />
        <div className="flex items-center gap-2 md:gap-4 ">
        <a
          href="https://zingmp3.vn/vip/upgrade?src_vip=114"
          target="_blank"
          className="hidden md:block px-5 py-1.5 bg-[#9b4de0] text-white rounded-full  w-[180px] overflow-hidden hover:brightness-90 transition-all "
        >
          Nâng cấp tài khoản
        </a>

        <div className="relative group hidden md:block">
          <a
            href="https://github.com/zmp3-pc/zmp3-pc/releases/download/v1.1.7/Zing-MP3-Setup-1.1.7.exe"
            target="_blank"
            className="flex items-center gap-1.5 text-[#c0b8cc] hover:text-[#c273ed] px-2 py-1.5 transition-colors"
          >
            <span className="text-sm whitespace-nowrap">Tải bản Windows</span>
          </a>
          <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-[#34224f] text-white text-xs md:text-sm rounded-lg whitespace-nowrap z-10">
            Zing MP3 đã có ứng dụng cho máy tính, tải ngay cho trải nghiệm tuyệt
            vời nhất.
          </div>
        </div>

        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#c0b8cc] hover:bg-[#393243] transition-colors cursor-pointer">
          <img
              src='Setup.png'
              className="w-full h-full object-cover"
          />
        </button>

        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer">
          <img
            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.13.0/static/media/user-default.3ff115bb.png"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSelectSong: PropTypes.func,
  onSelectArtist: PropTypes.func
};

export default Header;
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setIsActive(e.target.value.length > 0);
  };

  const handleClearInput = () => {
    setSearchText('');
    setIsActive(false);
  };

  return (
    <header className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-[#170f23] border-b border-[#393243] flex items-center px-20 p-4 shadow-md z-50">
      <div className="flex items-center space-x-4">
        <button className={`text-white p-2 rounded-full cursor-pointer ${isActive ? 'opacity-100 hover:bg-gray-700' : 'opacity-30'}`}>
          <FaArrowLeft />
        </button>
        <button className={`text-white p-2 rounded-full cursor-pointer ${isActive ? 'opacity-100 hover:bg-gray-700' : 'opacity-30'}`}>
          <FaArrowRight />
        </button>
      </div>

      <div className="flex-grow px-4 relative">
        <input
          type="text"
          value={searchText}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          className="w-full max-w-lg p-2 rounded-full bg-[#2D2D2D] text-white placeholder-gray-100 focus:outline-none focus:bg-gray-700"
          onChange={handleInputChange}
        />
        {searchText && (
          <button
            className="absolute right-2 top-2 text-white rounded-full hover:bg-gray-700"
            onClick={handleClearInput}
          >
            <IoClose />
          </button>
        )}
      </div>

      <div className="flex space-x-4">
        <a
          href="https://zingmp3.vn/vip/upgrade?src_vip=114"
          target="_blank"
          className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 cursor-pointer font-bold">
          Nâng cấp tài khoản
        </a>
        <a
          href="https://github.com/zmp3-pc/zmp3-pc/releases/download/v1.1.7/Zing-MP3-Setup-1.1.7.exe"
          target="_blank"
          className="px-4 py-2 bg-[#2D2D2D] text-purple-500 rounded-full hover:bg-purple-700 cursor-pointer font-bold">
          Tải bản Windows
        </a>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-600 hover:bg-gray-700 cursor-pointer">
        <img
            src="/Setup.png"
            alt="User Setup"
            className="w-full h-full object-cover"
          />
        </button>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer">
          <img
            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.13.0/static/media/user-default.3ff115bb.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
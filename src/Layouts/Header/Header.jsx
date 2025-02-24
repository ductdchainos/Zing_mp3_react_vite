import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-gray-900 flex items-center p-4 shadow-md z-50">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
      </div>
      <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Nâng cấp tài khoản
      </button>
      <button className="ml-2 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900">
        Tải bản Windows
      </button>
      <div className="ml-4 flex items-center space-x-4">
        <button className="text-white">
          <i className="fas fa-cog"></i>
        </button>
        <button className="text-white">
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;


const Sidebar = () => {
  return (
    <div className="bg-indigo-900 text-white w-64 h-screen p-4 fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <img src="/logo-dark.svg" alt="Logo" className="w-full h-auto mb-4" /> {/* Sử dụng link SVG */}
        </div>
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-book mr-2"></i> Thư Viện
            </a>
          </li>
          <li className="mb-4 bg-gray-700 p-2 rounded text-white">
            <a href="#" className="flex items-center">
              <i className="fas fa-compass mr-2"></i> Khám Phá
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-chart-line mr-2"></i> #zingchart
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white border-b border-gray-600 pb-2">
              <i className="fas fa-broadcast-tower mr-2"></i> Radio <span className="bg-red-500 text-white text-xs ml-2 px-1 rounded">LIVE</span>
            </a>
          </li>
          <li className="mb-4 mt-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-music mr-2"></i> BXH Nhạc Mới
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-th-large mr-2"></i> Chủ Đề & Thể Loại
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-star mr-2"></i> Top 100
            </a>
          </li>
        </ul>
        <div className="mt-6 p-4 bg-purple-600 text-white rounded">
          <div className="text-sm font-bold mb-2">Đăng nhập để khám phá playlist dành riêng cho bạn</div>
          <button className="bg-purple-700 text-white py-2 px-4 rounded-20px w-full hover:bg-purple-800">
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      <div className="mt-auto mb-6">
        <button className="flex items-center text-white p-2 rounded w-full justify-center">
            + Tạo playlist mới
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

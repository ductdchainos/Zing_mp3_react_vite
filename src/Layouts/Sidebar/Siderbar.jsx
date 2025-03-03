const Sidebar = () => {
  return (
    <div className="bg-indigo-900 text-white w-64 fixed top-0 left-0 flex flex-col justify-between overflow-y-auto" style={{ bottom: "var(--footer-height, 0px)" }}>
      <div>
        <div className="mb-6 p-4">
          <img src="/logo-dark.svg" alt="Logo" className="w-full h-auto mb-4" /> 
        </div>
        <ul className="px-4">
          <li className="mb-4">
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white">
              <i className="fas fa-book mr-2"></i> Thư Viện
            </a>
          </li>
          <li className="mb-4 bg-gray-400 p-2 rounded text-white">
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
            <a href="#" className="flex items-center hover:bg-gray-800 p-2 rounded text-white pb-2">
              <i className="fas fa-broadcast-tower mr-2"></i> Radio <span className="bg-red-500 text-white text-xs ml-2 px-1 rounded">LIVE</span>
            </a>
          </li>
          <hr className="my-4 border-gray-600"/>
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
        <div className="mt-6 mx-4 p-4 bg-purple-600 text-white rounded-lg">
          <div className="text-sm text-center font-bold mb-2">Đăng nhập để khám phá playlist dành riêng cho bạn</div>
          <button className="bg-purple-600 text-white py-2 px-4 font-bold border-2 border-white rounded-full w-full hover:bg-purple-800 cursor-pointer">
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      <div className="w-full p-4">
        <hr className="my-2 border-gray-600 w-full" />
        <button className="flex items-center text-white p-2 rounded w-full justify-center cursor-pointer">
          + Tạo playlist mới
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Siderbar';
import RouteCore from '../../Services/Routes/RouteCore';

const Main = () => {
    return (
        <div id="app" className="flex">
            <Sidebar /> {/* Thêm Sidebar vào đây */}
            <div className="flex-1 ml-64"> {/* Dịch chuyển nội dung chính sang phải để nhường chỗ cho Sidebar */}
                <Header />
                <div className="pt-16"> {/* Thêm khoảng trống ở trên để nhường chỗ cho Header */}
                    <RouteCore />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Main;

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Siderbar';
import RouteCore from '../../Services/Routes/RouteCore';

const Main = () => {
    return (
        <div id="app" className="flex overflow-x-hidden bg-[#170f23]">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 ml-64 relative"> {/* Main content area */}
                <Header />
                <div className="pt-16 pb-20"> {/* Space for header and footer */}
                    <RouteCore />
                </div>
            </div>
        </div>
    );
}

export default Main;

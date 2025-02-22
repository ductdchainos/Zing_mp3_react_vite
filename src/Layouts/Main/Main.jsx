import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RouteCore from '../../Services/Routes/RouteCore';

const Main = () => {
    return (
        <div id="app">
            <Header />
            <RouteCore />
            <Footer />
        </div>
    );
}

export default Main;

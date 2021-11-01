import Nav from "../Nav/Nav"
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Packages from "../Packages/Packages";

const Home = () => {
    return (
        <>
            <Nav/>
            <Banner />
            <Packages />
            <About />
            <Contact /> 
            <Footer />
        </>
    )
}

export default Home

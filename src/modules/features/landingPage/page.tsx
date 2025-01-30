import AppSection from "./components/appSection";
import Discovering from "./components/discovering";
import Footer from "./components/footer";
import NavBar from "./components/navBar";
import Signup from "./components/signup";

const LandingPage = () => {
    return (
        <div>
            <NavBar/>
            <Discovering/>
            <Signup/>
            <AppSection/>
            <Footer/>
        </div>
    );
    }
export default LandingPage;
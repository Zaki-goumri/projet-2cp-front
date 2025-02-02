import AppSection from "@/modules/features/landingPage/components/appSection";
import Discovering from "@/modules/features/landingPage/components/discovering";
import Footer from "@/modules/features/landingPage/components/footer";
import  NavBar  from "@/modules/features/landingPage/components/navBar";
import Signup from "@/modules/features/landingPage/components/signup";

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden ">
            <NavBar/>
            <Discovering/>
            <Signup/>
            <AppSection/>
            <Footer/>
        </div>
    );
    }
export default LandingPage;
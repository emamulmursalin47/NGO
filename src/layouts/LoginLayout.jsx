import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";


const LoginLayout = () => {
    return (
        <div>
            <Outlet />
            <div className="w-full relative z-10">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default LoginLayout;
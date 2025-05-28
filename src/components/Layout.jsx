import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 1000,
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
                <Navbar />
                <main className="flex-1 p-6 bg-white  md:mx-[10%]">
                    <Outlet />
                </main>
                <footer className="p-4 text-center text-white bg-gray-800">
                    &copy; 2025 ABC Company
                </footer>
            </div>
        </>
    );
};

export default Layout;

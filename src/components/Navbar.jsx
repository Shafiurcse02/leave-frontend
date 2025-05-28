import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // icon
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authAPI";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // মোবাইলে toggle করার জন্য
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);  // User state from redux store

   
    // Logout handler
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Dispatch logout action
            const action = await dispatch(logout());

            // Check if the action was fulfilled successfully
            if (action.meta.requestStatus === 'fulfilled') {
                // Redirect to login page after successful logout
                navigate('/login');
            } else {
                // Handle failed logout here (if necessary)
                toast.error("Logout failed! Please try again.");
            }
        } catch (error) {
            // Catch any errors (like network issues) during logout
            toast.error("Logout failed! Please try again.");
            console.error("Logout error:", error);
        }
    };


    return (
        <nav className="bg-indigo-600 text-white shadow-md md:px-[10%]">
            <div className="container flex items-center justify-between px-4 py-3 mx-auto">
                {/* 🔰 লোগো */}
                <h1 className="text-2xl font-bold">মাই সাইট</h1>

                {/* ☰ মোবাইলের জন্য hamburger icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* 🖥️ ডেক্সটপের জন্য মেনু */}
                <ul className="hidden gap-6 md:flex">
                    <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
                    <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
                    {!user ? (
                        <>
                            <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
                            <li><Link to="/reg" className="hover:text-yellow-300">Registration</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/profile" className="hover:text-yellow-300">Profile</Link></li>
                            <li><Link to="/leaveTypes" onClick={() => setIsOpen(false)}>leaveTypes</Link></li>

                            <li><Link to="/leave" className="hover:text-yellow-300">Leave</Link></li>
                            <li>
                                <button onClick={handleLogout} className="hover:text-yellow-300">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* 📱 মোবাইল মেনু (slide করে আসে) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4 space-y-2 bg-indigo-500 md:hidden"
                        onBlur={() => setIsOpen(false)}  // Close the menu if clicked outside
                        tabIndex="0"  // Allow focus so that onBlur works
                    >
                        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                        {!user ? (
                            <>
                                <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                                <li><Link to="/reg" onClick={() => setIsOpen(false)}>Registration</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
                                <li><Link to="/leaveTypes" onClick={() => setIsOpen(false)}>leaveTypes</Link></li>

                                <li><Link to="/leave" onClick={() => setIsOpen(false)}>Leave</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-yellow-300">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

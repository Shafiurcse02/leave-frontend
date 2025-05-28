import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authAPI";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasLoggedOut = useRef(false); // 🧠 useRef to prevent double logout
    useEffect(() => {
        const handleLogout = async () => {
            if (hasLoggedOut.current) return;
            hasLoggedOut.current = true;
            try {
                const response = await dispatch(logout()).unwrap(); // unwrap to get real response or throw error
                console.log(response);
                toast.success('সফলভাবে লগআউট হয়েছে!');
                navigate("/login", replace);
            } catch (error) {
                console.error("Logout error:", error);
                toast.error('লগআউট ব্যর্থ হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।');
            }
        };

        handleLogout();
    }, [dispatch, navigate]);

    return (
        <h1 className="mt-10 text-xl font-semibold text-center">Logging out...</h1>
    );
};

export default LogoutPage;

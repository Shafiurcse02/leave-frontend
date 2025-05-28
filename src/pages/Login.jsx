import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginUser } from "../features/auth/authAPI";
import { fetchProfile } from "../features/emp/empAPI";


const Login = ({ isLog = true }) => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(user, " ** *** **");
    const [isLogin, setIsLogin] = useState(isLog);

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLogin,
    } = useForm();

    useEffect(() => {
        if (loading) return;

        if (user) {
            const from = location.state?.from?.pathname || "/profile";
            navigate(from, { replace: true });
        }
    }, [user, loading, navigate, location]);






    const {
        register: registerReg,
        handleSubmit: handleSubmitReg,
        formState: { errors: errorsReg },
        reset: resetReg,
    } = useForm();

    const onLoginSubmit = async (data) => {
        try {
            const resultAction = await dispatch(LoginUser(data));

            if (LoginUser.rejected.match(resultAction)) {
                throw new Error(resultAction.payload || "Login failed");
            }

            await dispatch(fetchProfile());
            navigate("/profile", { replace: true });
            toast.success("সফলভাবে কাজ সম্পন্ন হয়েছে!");
            resetLogin();

        } catch (error) {
            toast.error("লগইন ব্যর্থ হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।");
            console.error("Login error:", error);
        }
    };

    const onRegisterSubmit = (data) => {
        toast.success('সফলভাবে কাজ সম্পন্ন হয়েছে!');
        alert("Register data: " + JSON.stringify(data));
        resetReg();
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        resetLogin();
        resetReg();
    };

    const formVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="flex items-center justify-center p-4 bg-gray-100">
            {isLogin ? (
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

                    <AnimatePresence mode="wait">
                        <motion.form
                            key="login"
                            onSubmit={handleSubmitLogin(onLoginSubmit)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={formVariants}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Valid Email"
                                    {...registerLogin("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errorsLogin.email && (
                                    <p className="mt-1 text-sm text-red-500">{errorsLogin.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    {...registerLogin("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errorsLogin.password && (
                                    <p className="mt-1 text-sm text-red-500">{errorsLogin.password.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 text-white rounded transition
                                    ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </motion.form>
                    </AnimatePresence>

                    <p className="mt-6 text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={toggleForm}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            {isLogin ? "Register here" : "Login here"}
                        </button>
                    </p>
                </div>
            ) : (
                <div className="items-center justify-center w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>

                    <AnimatePresence mode="wait">
                        <motion.form
                            key="register"
                            onSubmit={handleSubmitReg(onRegisterSubmit)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={formVariants}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            {/* Same form fields for registration */}
                        </motion.form>
                    </AnimatePresence>

                    <p className="col-span-2 mt-6 text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={toggleForm}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            {isLogin ? "Register here" : "Login here"}
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Login;

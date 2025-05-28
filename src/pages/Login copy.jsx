import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ isLog = true }) => {
    const [isLogin, setIsLogin] = useState(isLog);
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLogin,
    } = useForm();

    // React Hook Form setup for register
    const {
        register: registerReg,
        handleSubmit: handleSubmitReg,
        formState: { errors: errorsReg },
        reset: resetReg,
    } = useForm();

    const onLoginSubmit = (data) => {
        alert("Login data: " + JSON.stringify(data));
        resetLogin();
    };

    const onRegisterSubmit = (data) => {
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
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">
                    {isLogin ? "Login" : "Register"}
                </h2>

                <AnimatePresence mode="wait">
                    {isLogin ? (
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
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorsLogin.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                <input
                                    type="password"
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
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorsLogin.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="register"
                            onSubmit={handleSubmitReg(onRegisterSubmit)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={formVariants}
                            transition={{ duration: 0.3 }}
                            className="w-full space-y-4"
                        >
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <input
                                    type="text"
                                    {...registerReg("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters",
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errorsReg.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorsReg.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    {...registerReg("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errorsReg.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorsReg.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700">লিঙ্গ</label>
                                <select
                                    {...registerReg("gender", {
                                        required: "Gender is required",
                                    }
                                    )}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- নির্বাচন করুন --</option>
                                    <option value="male">পুরুষ</option>
                                    <option value="Female">মহিলা</option>
                                    <option value="Others">অন্যান্য</option>
                                </select>
                                {errorsReg.gender && (
                                    <p className="text-sm text-red-500">{errorsReg.gender.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                <input
                                    type="password"
                                    {...registerReg("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errorsReg.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorsReg.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
                            >
                                Register
                            </button>
                        </motion.form>
                    )}
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
        </div>
    );
}
export default Login;
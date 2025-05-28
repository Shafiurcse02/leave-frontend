import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

// প্রোফাইল ডিটেইলস দেখানোর জন্য Modal কম্পোনেন্ট
export default function Modal({ isOpen, onClose, profile }) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="fixed top-1/4  md:top-1/4 md:left-1/4 transform z-50 w-[90%] max-w-lg p-8 bg-white rounded-2xl shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-indigo-700">প্রোফাইল বিবরণ</h2>
                            <button
                                onClick={onClose}
                                className="text-2xl font-bold text-gray-400 hover:text-red-500"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mb-4 space-y-4 text-lg text-gray-700">
                            <p><span className="font-semibold">নাম:</span> {profile.name}</p>
                            <p><span className="font-semibold">ইমেইল:</span> {profile.email}</p>
                            <p><span className="font-semibold">মোবাইল:</span> {profile.phone}</p>
                            <p><span className="font-semibold">মোবাইল:</span> {profile.phone}</p>
                            <p><span className="font-semibold">মোবাইল:</span> {profile.phone}</p>
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
                            >
                                বন্ধ করুন
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

    );
}

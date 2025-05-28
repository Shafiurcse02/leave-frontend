import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

export default function Profile() {
    const { loading, error, user } = useSelector(state => state.auth);
    const [showModal, setShowModal] = useState(false);

    
    const sampleProfile = {
        name: "মো. আরিফ হোসেন",
        email: "arif@example.com",
        phone: "০১৭১২৩৪৫৬৭৮",
        address: "ঢাকা, বাংলাদেশ",
        experience: "৫",
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-100">
            {user && (
                <h2>{user.email}</h2>
            )}
            <h1>{user != null ? user.email : "No data"}</h1>

            <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 text-xl font-bold text-white transition bg-purple-600 rounded-xl hover:bg-purple-700"
            >
                প্রোফাইল দেখুন
            </button>

            {/* প্রোফাইল ডিটেইলস মোডাল */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                profile={sampleProfile}
            />
        </div>
    );
}

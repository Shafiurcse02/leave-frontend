import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    createLeaveType,
    deleteLeaveType,
    fetchLeaveTypes,
    updateLeaveType,
} from "../features/leaveType/leaveTypeAPI";

const LeaveTypeList = () => {
    const dispatch = useDispatch();
    const { leaveTypes, loading, error } = useSelector(
        (state) => state.leaveType
    );

    const [modalData, setModalData] = useState(null);
    const [modalMode, setModalMode] = useState(null); // "view", "edit", "add"

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(fetchLeaveTypes());
    }, [dispatch]);

    const handleDelete = (id) => {
        console.log(id); // ✅ Ensure this logs
        if (window.confirm("আপনি কি নিশ্চিত এই leave type মুছে ফেলতে চান?")) {
            dispatch(deleteLeaveType(id))
                .unwrap()
                .then(() => {
                    closeModal();
                    dispatch(fetchLeaveTypes());
                    toast.success("ডিলিট হয়েছে!");
                })
                .catch(() => {
                    alert("ডিলিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
                });
        } else {
            console.log("No data");
        }
    };



    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setModalData(item);
        reset(item ? { name: item.name, allowedDays: item.allowedDays } : { name: "", allowedDays: "" });
    };

    const closeModal = () => {
        setModalMode(null);
        setModalData(null);
        reset();
    };

    const onSubmit = (data) => {
        const payload = {
            ...data,
            allowedDays: Number(data.allowedDays),
        };

        if (modalMode === "edit") {
            dispatch(updateLeaveType({ id: modalData.id, data: payload }))
                .unwrap()
                .then(() => {
                    closeModal();
                    dispatch(fetchLeaveTypes());
                });
        } else if (modalMode === "add") {
            dispatch(createLeaveType(payload))
                .unwrap()
                .then(() => {
                    closeModal();
                    dispatch(fetchLeaveTypes());
                });
        }
    };

    return (
        <div className="max-w-5xl p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Leave Types</h2>
                <button
                    onClick={() => openModal("add")}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    + Add Leave Type
                </button>
            </div>

            {loading && <p className="text-center text-gray-500">লোড হচ্ছে...</p>}
            {error && <p className="text-center text-red-600">ত্রুটি: {error}</p>}

            {leaveTypes.length > 0 ? (
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="text-white bg-blue-600">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Allowed Days</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveTypes.map((lt, index) => (
                            <tr key={lt.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{lt.name}</td>
                                <td className="px-4 py-3">{lt.allowedDays}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <button
                                        onClick={() => openModal("view", lt)}
                                        className="text-purple-600 underline hover:text-purple-800"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => openModal("edit", lt)}
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(lt.id)}
                                        className="text-red-600 underline hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="text-center text-gray-600">No Available Data</h2>
            )}

            {/* Modal */}
            <AnimatePresence>
                {modalMode && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.95 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        >
                            <h3 className="mb-4 text-xl font-bold">
                                {modalMode === "view"
                                    ? "Leave Type Details"
                                    : modalMode === "edit"
                                        ? "Edit Leave Type"
                                        : "Add New Leave Type"}
                            </h3>

                            {modalMode === "view" ? (
                                <div className="space-y-3">
                                    <div>
                                        <strong>Name:</strong> {modalData.name}
                                    </div>
                                    <div>
                                        <strong>Allowed Days:</strong> {modalData.allowedDays}
                                    </div>
                                    <div className="mt-4 text-right">
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Name</label>
                                        <input
                                            type="text"
                                            {...register("name", { required: "নাম আবশ্যক" })}
                                            className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Allowed Days</label>
                                        <input
                                            type="number"
                                            {...register("allowedDays", {
                                                required: "দিনের সংখ্যা আবশ্যক",
                                                min: { value: 1, message: "কমপক্ষে ১ দিন দিতে হবে" },
                                            })}
                                            className={`w-full border px-3 py-2 rounded ${errors.allowedDays ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.allowedDays && (
                                            <p className="text-sm text-red-500">
                                                {errors.allowedDays.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <motion.button
                                            type="submit"
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            {modalMode === "add" ? "Create" : "Save"}
                                        </motion.button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LeaveTypeList;

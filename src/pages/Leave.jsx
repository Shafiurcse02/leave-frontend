import { addDays, differenceInCalendarDays, format, subDays } from "date-fns";
import { motion } from "framer-motion";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { applyLeave } from "../features/leave/leaveAPI";
import { fetchLeaveTypes } from "../features/leaveType/leaveTypeAPI";

const Leave = () => {
    const { user } = useSelector((state) => state.auth);
    const { leaveTypes, loading, error } = useSelector((state) => state.leaveType);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        setValue,
        watch,
    } = useForm();

    const startDate = watch("startDate");
    useEffect(() => {
        dispatch(fetchLeaveTypes());
    }, [dispatch]);
    // রিডাইরেক্ট যদি লগইন না করে
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // শুরুর তারিখ সেট হলে শেষ তারিখ অটো সেট হবে
    useEffect(() => {
        if (startDate) {
            const newToDate = addDays(startDate, 3);
            setValue("endDate", newToDate);
        }
    }, [startDate, setValue]);

    useEffect(() => {
        if (isSubmitSuccessful) {

            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = async (data) => {
        const fromDate = watch("startDate");
        const toDate = watch("endDate");

        const totalDays =
            fromDate && toDate ? differenceInCalendarDays(toDate, fromDate) + 1 : 0;

        const payload = {
            ...data,
            totalDays,
            startDate: fromDate ? format(fromDate, "dd-MM-yyyy") : null,
            endDate: toDate ? format(toDate, "dd-MM-yyyy") : null,
            empId: user?.id,
            typeId: Number(data.typeId)
        };

        console.log("ছুটি আবেদন:", payload);

        dispatch(applyLeave(payload));
        toast.success(" হয়েছে!");
    };

    return (
        <motion.div
            className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        >
            <h2 className="mb-4 text-2xl font-semibold text-center text-blue-600">
                ছুটি আবেদন ফর্ম
            </h2>

            {isSubmitSuccessful && (
                <motion.div
                    className="mb-4 font-medium text-center text-green-600"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.1 }}
                >
                    ✅ আবেদন সফলভাবে জমা হয়েছে!
                </motion.div>
            )}

            {error && (
                <div className="mb-4 text-sm text-center text-red-600">
                    ⚠️ ছুটির ধরন লোড করতে সমস্যা হয়েছে: {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* ছুটির ধরন */}
                <div>
                    <label className="block mb-1 text-sm font-medium">ছুটির ধরন</label>
                    <select
                        {...register("typeId", { required: "এই ঘরটি আবশ্যক" })}
                        defaultValue=""
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={loading}
                    >
                        <option value="">-- নির্বাচন করুন --</option>
                        {loading ? (
                            <option disabled>লোড হচ্ছে...</option>
                        ) : leaveTypes?.length ? (
                            leaveTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>কোনো ছুটি পাওয়া যায়নি</option>
                        )}
                    </select>


                    {errors.typeId && (
                        <p className="text-sm text-red-500">{errors.typeId.message}</p>
                    )}
                </div>

                {/* শুরুর এবং শেষ তারিখ */}
                <div className="flex gap-4">
                    {/* শুরুর তারিখ */}
                    <div className="w-1/2">
                        <label className="block mb-1 text-sm font-medium">শুরুর তারিখ</label>
                        <Controller
                            control={control}
                            name="startDate"
                            rules={{ required: "শুরুর তারিখ আবশ্যক" }}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="তারিখ নির্বাচন করুন"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    minDate={subDays(new Date(), 30)}
                                    maxDate={addDays(new Date(), 30)}
                                />
                            )}
                        />
                        {errors.startDate && (
                            <p className="text-sm text-red-500">{errors.startDate.message}</p>
                        )}
                    </div>

                    {/* শেষ তারিখ */}
                    <div className="w-1/2">
                        <label className="block mb-1 text-sm font-medium">শেষ তারিখ</label>
                        <Controller
                            control={control}
                            name="endDate"
                            rules={{ required: "শেষ তারিখ আবশ্যক" }}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="তারিখ নির্বাচন করুন"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    minDate={startDate}
                                    maxDate={startDate ? addDays(startDate, 30) : null}
                                />
                            )}
                        />
                        {errors.endDate && (
                            <p className="text-sm text-red-500">{errors.endDate.message}</p>
                        )}
                    </div>
                </div>

                {/* কারণ */}
                <div>
                    <label className="block mb-1 text-sm font-medium">ছুটির কারণ</label>
                    <textarea
                        rows="3"
                        placeholder="আপনার কারণ লিখুন..."
                        {...register("name", { required: "কারণ লিখুন" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* সাবমিট */}
                <motion.button
                    type="submit"
                    className="w-full py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    আবেদন জমা দিন
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Leave;

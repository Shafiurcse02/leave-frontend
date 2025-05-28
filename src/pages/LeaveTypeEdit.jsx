import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLeaveTypeById, updateLeaveType } from "../features/leaveType/leaveTypeAPI";

const LeaveTypeEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { leaveType, loading, error } = useSelector((state) => state.leaveType);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(fetchLeaveTypeById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (leaveType) {
            reset({
                name: leaveType.name,
                allowedDays: leaveType.allowedDays,
            });
        }
    }, [leaveType, reset]);

    const onSubmit = (data) => {
        console.log(data);

        dispatch(updateLeaveType({ id, ...data })).then(() => {
            navigate("/leave-types"); // আপডেটের পরে লিস্ট পেজে রিডাইরেক্ট
        });
    };

    if (loading) return <p className="mt-10 text-center">লোড হচ্ছে...</p>;
    if (error) return <p className="mt-10 text-center text-red-600">ত্রুটি: {error}</p>;

    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Edit Leave Type</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "নাম অবশ্যই দিতে হবে" })}
                        className={`w-full border px-3 py-2 rounded-md focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Allowed Days</label>
                    <input
                        type="number"
                        {...register("allowedDays", {
                            required: "Allowed days অবশ্যই দিতে হবে",
                            min: { value: 1, message: "Allowed days অবশ্যই 1 বা তার বেশি হতে হবে" },
                        })}
                        className={`w-full border px-3 py-2 rounded-md focus:outline-none ${errors.allowedDays ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.allowedDays && (
                        <p className="mt-1 text-sm text-red-500">{errors.allowedDays.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default LeaveTypeEdit;

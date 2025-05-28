import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaveTypes } from '../features/leaveType/leaveTypeAPI';

const P = () => {
    const dispatch = useDispatch();
    const { leaveTypes, loading, error } = useSelector((state) => state.leaveType);

    useEffect(() => {
        dispatch(fetchLeaveTypes());
    }, [dispatch]);

    if (loading) return <p>লোড হচ্ছে...</p>;
    if (error) return <p>ত্রুটি: {error}</p>;

    return (
        <ul>
            {leaveTypes.map((type) => (
                <li key={type.id}>{type.name}</li>
            ))}
        </ul>
    );
};
export default P

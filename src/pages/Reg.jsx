import { motion } from 'framer-motion';

const data = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: `ইউজার ${i + 1}`,
    email: `user${i + 1}@example.com`
}));

const ITEMS_PER_PAGE = 10;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center mt-4 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
                পূর্ববর্তী
            </button>

            {getPages(currentPage, totalPages).map((page, idx) => {
                if (page === "left-ellipsis" || page === "right-ellipsis") {
                    return (
                        <span key={idx} className="px-2 text-lg text-gray-500 select-none">
                            ...
                        </span>
                    );
                }

                return (
                    <motion.button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-lg text-sm ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {page}
                    </motion.button>
                );
            })}


            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
                পরবর্তী
            </button>
        </div>
    );
};
export default Pagination;
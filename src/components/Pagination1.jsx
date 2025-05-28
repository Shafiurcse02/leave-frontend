import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const siblingsCount = 1;

    const paginationRange = () => {
        const totalPageNumbers = siblingsCount * 2 + 5; // Total number of visible page buttons

        // If total pages are fewer than the calculated number of visible pages, show all pages
        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Define the left and right sibling indices
        const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2); // Left sibling page range
        const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages - 1); // Right sibling page range

        // Flags to determine if ellipses are required
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        // Create an array to hold the pagination pages
        const pages = [];

        // Always add the first page
        pages.push(1);

        // If needed, add the left ellipsis
        if (shouldShowLeftDots) {
            pages.push("left-ellipsis");
        }

        // Add the page numbers from the left sibling to the right sibling
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            if (!pages.includes(i)) { // Avoid adding duplicate pages
                pages.push(i);
            }
        }

        // If needed, add the right ellipsis
        if (shouldShowRightDots) {
            pages.push("right-ellipsis");
        }

        // Always add the last page if it's not already included
        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };


    const pages = paginationRange();

    return (
        <div className="flex items-center justify-center mt-6 space-x-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                aria-label="Previous page"
            >
                Prev
            </button>

            {pages.map((page, idx) => {
                if (page === "left-ellipsis" || page === "right-ellipsis") {
                    return (
                        <span
                            key={idx}
                            className="px-2 text-lg font-semibold text-gray-500 select-none"
                        >
                            &hellip;
                        </span>
                    );
                }

                return (
                    <motion.button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${page === currentPage
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={page === currentPage ? { scale: 1.2 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </motion.button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                aria-label="Next page"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

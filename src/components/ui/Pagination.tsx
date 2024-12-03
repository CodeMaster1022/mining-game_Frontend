import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <button 
                onClick={handlePrevious} 
                disabled={currentPage === 1} 
                className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Previous
            </button>

            <div className="flex space-x-1">
                {[...Array(totalPages).keys()].map((number) => (
                    <button 
                        key={number + 1} 
                        onClick={() => handlePageClick(number + 1)} 
                        className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>

            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
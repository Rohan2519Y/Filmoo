import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default function NextPrev({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="h-[60px] w-full flex justify-center items-center">
            <Button 
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`h-[60%] w-auto px-3 mx-5 border-slate-300 border-[1px] flex justify-center items-center text-white rounded-lg ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'
                }`}
            >
                <ArrowBackIcon />
            </Button>
            
            {/* Page Numbers - Show up to 3 pages */}
            {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
                let pageNumber;
                
                if (totalPages <= 3) {
                    // If total pages is 3 or less, show all pages
                    pageNumber = index + 1;
                } else {
                    // If more than 3 pages, show current page in middle when possible
                    if (currentPage === 1) {
                        pageNumber = index + 1; // Show 1, 2, 3
                    } else if (currentPage === totalPages) {
                        pageNumber = totalPages - 2 + index; // Show last 3 pages
                    } else {
                        pageNumber = currentPage - 1 + index; // Show current-1, current, current+1
                    }
                }
                
                return (
                    <div
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`h-[60%] w-auto px-3 mx-2 border-slate-300 border-[1px] flex justify-center items-center text-white rounded-xl cursor-pointer transition-all duration-200 ${
                            currentPage === pageNumber 
                                ? 'bg-slate-500 border-slate-400' 
                                : 'hover:bg-slate-700'
                        }`}
                    >
                        {pageNumber}
                    </div>
                );
            })}
            
            <Button 
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`h-[60%] w-auto px-3 mx-5 border-slate-300 border-[1px] flex justify-center items-center text-white rounded-lg ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'
                }`}
            >
                <ArrowForwardIcon />
            </Button>
        </div>
    );
}
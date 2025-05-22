import { Link } from "@inertiajs/react";

export default function Pagination({meta, setCurrentPage}){
    const { current_page, last_page } = meta;

    return (
        <nav className="text-center mt-4">
            <button
                onClick={() => current_page > 1 && setCurrentPage(current_page - 1)}
                disabled={current_page <= 1}
                className={`inline-block py-2 px-3 rounded-lg text-dark m-1 dark:text-gray-200 text-xs text-white ${
                    current_page <= 1
                        ? "!text-gray-500 cursor-not-allowed"
                        : "hover:bg-gray-950"
                }`}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: last_page }, (_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`inline-block py-2 px-3 rounded-lg text-dark m-1 dark:text-gray-200 text-xs text-white ${
                            page === current_page ? "bg-gray-950" : "hover:bg-gray-950"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() => current_page < last_page && setCurrentPage(current_page + 1)}
                disabled={current_page >= last_page}
                className={`inline-block py-2 px-3 rounded-lg text-dark m-1 dark:text-gray-200 text-xs text-white ${
                    current_page >= last_page
                        ? "!text-gray-500 cursor-not-allowed"
                        : "hover:bg-gray-950"
                }`}
            >
                Next
            </button>
        </nav>
    )
}

import { clearFlashMessage } from "@/stores/slices/flashMessageSlice";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FlashMessage(){

    const flashMessage = useSelector((state) => state.flashMessage);
    const dispatch = useDispatch();
    
        useEffect(() => {
            if (flashMessage) {
                const timeout = setTimeout(() => {
                    dispatch(clearFlashMessage());
                }, 4000);
    
                return () => clearTimeout(timeout);
            }
        }, [flashMessage, dispatch]);

        useEffect(() => {
            const onStart = () => {
                dispatch(clearFlashMessage());
            };

            router.on('start', onStart);

            return () => {
                router.on('start', onStart);
            };
        }, [dispatch]);
        
    return (
        <>
            {flashMessage?.type === 'success' && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-50/30 backdrop-blur-md rounded-lg -m-1"></div>
                        <div className="relative flex bg-green-500/80 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-100 text-sm ring-1 ring-inset ring-emerald-100">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{flashMessage.message}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {flashMessage?.type === 'error' && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-50/30 backdrop-blur-md rounded-lg -m-1"></div>
                        <div className="relative flex bg-red-500/80 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-100 text-sm ring-1 ring-inset ring-emerald-100">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{flashMessage.message}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
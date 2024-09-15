import { Link } from "@laravext/react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default ({children}) => {
    return (
        <div className="min-h-[70vh] flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
};

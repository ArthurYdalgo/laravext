import { Link, sharedProps } from "@laravext/react";
import ApplicationLogo from "@/components/ApplicationLogo";
import { JSX } from "react";

export default (props: {children : JSX.Element}) => {
    const {user} = sharedProps();

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {props.children}
            </div>
        </div>
    );
};

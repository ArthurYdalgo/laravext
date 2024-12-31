import { Link } from '@laravext/react';
import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';

export default function ResponsiveNavButton({className = '', children, ...props }: any) {
    return (
        <div
            {...props}
            className={`w-full flex items-start hover:cursor-pointer ps-3 pe-4 py-2 border-l-4 border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </div>
    );
}

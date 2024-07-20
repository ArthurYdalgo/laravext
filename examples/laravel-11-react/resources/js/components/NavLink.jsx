import Link from '@/components/Link';


export default({ 
    active = false, 
    href = '', 
    routeName = null, 
    children,
    ...props 
}) => {
    

    href = href || (routeName != null && route().has(routeName) && route(routeName));
    active = active || (routeName != null && route().has(routeName) && route().current(routeName));

    
    const className = (active !== null ? active : (routeName != null && route().has(routeName) && route().current(routeName))) ?
        'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out' 
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out';

    return (
        <Link
            {...props}
            href={href}
            className={className}
        >
            {children}
        </Link>
    );
}
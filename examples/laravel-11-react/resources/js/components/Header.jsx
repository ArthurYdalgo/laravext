export default ({ children }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                    {children}
                </h2>
            </div>
        </header>
    );
};
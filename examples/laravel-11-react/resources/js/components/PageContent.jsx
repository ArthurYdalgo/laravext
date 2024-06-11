export default ({ children }) => {
    return (
        <div>
            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900 dark:text-gray-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

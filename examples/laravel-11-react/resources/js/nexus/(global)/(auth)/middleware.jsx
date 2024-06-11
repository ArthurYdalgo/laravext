import { useEffect } from 'react';
import { sharedProps } from '@laravext/react';

export default ({children}) => {

    useEffect(() => {
        if (!sharedProps().auth?.user) {
            window.location.href = '/';
        }
    }, []);

    if (sharedProps().auth?.user) {
        return <>{children}</>;
    } else {
        return (
            <div className="flex justify-center items-center h-[75vh]">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold mb-4">I'm sorry Dave, I'm afraid I can't let you do that...</h1>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }
};
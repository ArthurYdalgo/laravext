import { useEffect } from 'react';
import { sharedProps } from '@laravext/react';

export default ({children}) => {

    const user = sharedProps().auth?.user;

    const allowedRoles = ['admin'];

    useEffect(() => {
        if (!user || !allowedRoles.some(role => user?.assigned_roles?.includes(role))) {
            window.location.href = '/';
        }
    }, []);

    if (user && allowedRoles.some(role => user?.assigned_roles?.includes(role))) {
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
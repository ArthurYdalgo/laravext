import { useEffect } from 'react';
import { sharedProps, visit } from '@laravext/react';
import { JSX } from "react";

export default (props: {children : JSX.Element}) => {
    
    const { user } = sharedProps().auth;

    useEffect(() => {
        if (user) {
            visit('/dashboard');
        }
    }, [user]);

    if(!user) {
       return props.children
    }

    return (<></>)
}
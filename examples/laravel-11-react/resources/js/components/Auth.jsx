import { sharedProps } from '@laravext/react';

export default ({children}) => {
    const { user } = sharedProps().auth;

    if(user) {
        return children;
    }

    return null;
}
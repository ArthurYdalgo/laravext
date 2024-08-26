import { sharedProps } from '@laravext/react';
import { visit } from '@laravext/react';

export default ({children}) => {
    if (sharedProps().auth.user) {
        visit('/')
        return;
    }

    return children;
}
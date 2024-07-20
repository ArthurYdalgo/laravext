import { sharedProps } from '@laravext/react';
import { visit } from '@laravext/react/router';

export default ({children}) => {
    if (!sharedProps().auth.user) {
        visit('/')
        return;
    }

    return children;
}
import { sharedProps } from '@laravext/react';

export default ({children}) => {
    if (sharedProps().auth.user) {
        // window.location.href = route('admin.dashboard');
        return;
    }

    return children;
}
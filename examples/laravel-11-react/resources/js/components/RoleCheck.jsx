import { sharedProps } from '@laravext/react';

const RoleCheck = ({ children, allowedRoles }) => {
    const { user } = sharedProps().auth;

    if (allowedRoles.some(role => user?.assigned_roles?.includes(role))) {
        return children;
    }

    return null;
}

export default RoleCheck;
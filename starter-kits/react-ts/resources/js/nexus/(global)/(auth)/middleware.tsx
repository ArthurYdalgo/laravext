import { PropsWithChildren, useEffect } from "react";
import { sharedProps, visit } from "@laravext/react";

export default ({ children }: PropsWithChildren) => {
    const { user } = sharedProps().auth;

    useEffect(() => {
        if (!user) {
            visit("/login");
        }
    }, [user]);

    if (!user) {
        return <></>;
    }

    return children;
};

import Dropdown from "@/components/Dropdown";
import Link from "@/components/Link";

import { laravextPageData } from "@laravext/react";

export default ({ children }) => {
    const { route_name } = laravextPageData();

    const routeLabels = {
        "settings.profile": "Profile",
        "settings.account": "Account",
    };

    return (
        <>
            {/* this div only shows on mobile */}

            {/* this div only shows on desktop */}
            <div className="sm:px-16">
                <div className="block sm:hidden">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="ml-1 transition inline-flex items-center px-4 py-2 bg-white w-full border-gray-300 border rounded-md">
                                {routeLabels[route_name]}
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            {Object.keys(routeLabels).map((routeName) => {
                                return (
                                    <Dropdown.Link
                                        key={routeName}
                                        routeName={routeName}
                                    >
                                        {routeLabels[routeName]}
                                    </Dropdown.Link>
                                );
                            })}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="sm:flex">
                    <div className="hidden sm:block px-2 min-w-48 w-3/12 space-y-1">
                        <div className="flex flex-col">
                            {Object.keys(routeLabels).map((routeName) => {
                                return (
                                    <Link
                                        key={routeName}
                                        routeName={routeName}
                                        className={
                                            "m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700  rounded-lg " +
                                            (route_name === routeName
                                                ? "font-bold bg-white"
                                                : "hover:bg-gray-50")
                                        }
                                    >
                                        {routeLabels[routeName]}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="sm:px-1 sm:w-9/12">{children}</div>
                </div>
            </div>
        </>
    );
};

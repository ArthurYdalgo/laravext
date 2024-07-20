import Fa from "@/components/Fa";
import Link from "@/components/Link";
import SVGLogo from "@/components/SVGLogo";
import { useTranslation } from "react-i18next";
import useStateRef from "react-usestateref";
import Auth from "@/components/Auth";
import { reload } from '@laravext/react/router';
import Guest from "@/components/Guest";
import {sharedProps} from "@laravext/react";
import RoleCheck from "@/components/RoleCheck";
import Dropdown from "@/components/Dropdown";
import DropdownButton from "@/components/DropdownButton";
import DropdownLink from "@/components/DropdownLink";

export default () => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();
    const [search, setSearch, searchRef] = useStateRef("");

    const logout = async () => {
        await axios.post('/api/auth/logout');
        reload();
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="mx-auto py-[7px] px-6 sm:px-6 lg:px-[15%]">
                <div className="flex items-center justify-between space-x-4">
                    <Link
                        href="/"
                        className=" rounded-[4px] px-3 py-1.5 border-2 border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition"
                    >
                        <h2 className="font-extrabold uppercase whitespace-nowrap text-lg leading-tight">
                            Dev Diary
                        </h2>
                    </Link>

                    <div className="relative w-full">
                        <Link
                            href={route("search", { q: searchRef.current })}
                            className="absolute p-0.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs"
                        >
                            <Fa
                                icon="search"
                                className="m-2 ml-3 w-[15px] -translate-y-[0.5px]"
                                size="lg"
                            />
                        </Link>
                        <input
                            type="text"
                            placeholder={`${t("Search")}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:pr-36 pl-10 py-1.5 rounded-md border border-gray-300 transition duration-300 focus:outline-none"
                        />
                        <div className="md:block hidden">
                            <span className="flex absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs ">
                                Powered by Meilisearch{" "}
                                <SVGLogo
                                    icon="/images/logos/meilisearch.svg"
                                    className="w-6 ml-1"
                                />
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Guest>
                            <Link
                                routeName="login"
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                {t("Login")}
                            </Link>
                            <Link
                                routeName="register"
                                className="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                {t("Register")}
                            </Link>
                        </Guest>
                        <Auth>
                            <Link
                                routeName="new"
                                className="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                {t("Create Post")}
                            </Link>
                            <div className="ms-2 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <img src={user?.avatar_url ?? "/images/avatars/placeholder.png"} alt={user?.name ?? 'blank-placeholder'} className="w-16 rounded-full" />
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48">
                                        <DropdownLink href={user ? route('user', {user: user?.username}) : ''}>
                                            <p className="font-bold text-base">{user?.name}</p>
                                            <p>@{user?.username}</p>
                                        </DropdownLink>
                                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                        <DropdownLink routeName='dashboard'>
                                            {t("Dashboard")}
                                        </DropdownLink>
                                        <DropdownLink routeName='new'>
                                            {t("Create Post")}
                                        </DropdownLink>
                                        <DropdownLink>
                                            {t("Bookmarks")}
                                        </DropdownLink>
                                        <DropdownLink>
                                            {t("Settings")}
                                        </DropdownLink>    
                                        <RoleCheck allowedRoles={["admin"]}>
                                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                        <DropdownLink routeName='admin.dashboard'>
                                            {t("Admin Dashboard")}
                                        </DropdownLink>
                                        </RoleCheck>
                                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                        <DropdownButton onClick={logout}>
                                            {t("Log Out")}
                                        </DropdownButton>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </Auth>
                    </div>
                </div>
            </div>
        </header>
    );
};

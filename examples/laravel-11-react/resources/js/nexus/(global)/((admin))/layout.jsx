import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import DropdownButton from '@/components/DropdownButton';
import NavLink from '@/components/NavLink';
import Link from '@/components/Link';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import axios from 'axios';
import { sharedProps } from '@laravext/react';
import usePrivacy from '@/hooks/usePrivacy'
import Fa from '@/components/Fa';
import { useTranslation } from 'react-i18next';
import Tooltip from '@/components/Tooltip';
import Cookies from 'js-cookie';

export default ({ children }) => {
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;
    const privacyInitialState = sharedProps().auth?.user?.privacy;
    const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

    const locales = {
        en: {
            locale: 'en',
            flag: '/images/flags/us.svg',
        },
        pt: {
            locale: 'pt',
            flag: '/images/flags/br.svg',
        },
    };

    useEffect(() => {
        if (privacyInitialState !== undefined) {
            setPrivacyActive(privacyInitialState);
        }
    }, []);

    const handleTogglePrivacy = () => {
        let state = privacyIsActive;
        togglePrivacy();

        axios.put('/api/auth/user', {
            privacy: !state
        });
    };

    const handleLocaleChange = (locale) => {
        i18n.changeLanguage(locale);

        Cookies.set('locale', locale);

        axios.put('/api/auth/user', {
            locale
        });
    };

    const logout = async () => {
        await axios.post('/api/auth/logout');
        window.location.href = '/';
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">

                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">

                            <div className="flex">

                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                    </Link>
                                </div>


                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink routeName="admin.dashboard">Dashboard</NavLink>
                                    <NavLink routeName="admin.teams">{t('Teams')}</NavLink>
                                    <NavLink routeName="admin.companies">{t('Companies')}</NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">

                                <Tooltip text={usePrivacy().active ? t('Click to disable privacy filter') : t('Click to enable privacy filter')}>
                                    <div className="cursor-pointer px-4 mt-1" onClick={handleTogglePrivacy}>
                                        <Fa icon={usePrivacy().active ? 'fa-eye-slash' : 'fa-eye'} className="text-gray-400 dark:text-gray-500" />
                                    </div>
                                </Tooltip>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center px-2 py-2 border border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                <img src={locales[i18n.language ?? user?.locale ?? 'en'].flag} className="w-[20px]" alt="Flag" />
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="24" align='right'>
                                        {Object.values(locales).map(locale => (
                                            <DropdownButton key={locale.locale} onClick={() => handleLocaleChange(locale.locale)}>
                                                <span className="flex items-center space-x-2">
                                                    <img src={locale.flag} className="w-[30px]" alt="Flag" />
                                                    <span>{locale.locale.toUpperCase()}</span>
                                                </span>
                                            </DropdownButton>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>
                                <div className="ms-2 relative">
                                    <Dropdown >
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button type="button" className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                    {user.name}
                                                    <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content align="right" width="48">
                                            <DropdownButton onClick={logout}>
                                                {t('Log Out')}
                                            </DropdownButton>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>


                            <div className="-me-2 flex items-center sm:hidden">
                                <div className="cursor-pointer px-3">
                                    <Fa onClick={handleTogglePrivacy} icon={usePrivacy().active ? 'fa-eye-slash' : 'fa-eye'} className="text-gray-400 dark:text-gray-500" />
                                </div>

                                <Dropdown align="right" width="24">
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center px-2 py-2 border border-transparent">
                                                <img src={locales[i18n.language ?? user?.locale ?? 'en'].flag} className="w-[20px]" alt="Flag" />
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {Object.values(locales).map(locale => (
                                            <DropdownButton key={locale.locale} onClick={() => handleLocaleChange(locale.locale)}>
                                                <span className="flex items-center space-x-2">
                                                    <img src={locale.flag} className="w-[30px]" alt="Flag" />
                                                    <span>{locale.locale.toUpperCase()}</span>
                                                </span>
                                            </DropdownButton>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>

                                <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className={(showingNavigationDropdown ? 'block ' : 'hidden ')+ ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink routeName="admin.dashboard">Dashboard</ResponsiveNavLink>
                            <ResponsiveNavLink routeName="admin.teams">{t('Teams')}</ResponsiveNavLink>
                            <ResponsiveNavLink routeName="admin.companies">{t('Companies')}</ResponsiveNavLink>
                        </div>


                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink onClick={logout}>{t('Log Out')}</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>
            </div>
        </div>
    );
};
<script setup>
import { ref, onMounted } from 'vue';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Dropdown from '@/components/Dropdown.vue';
import DropdownLink from '@/components/DropdownLink.vue';
import DropdownButton from '@/components/DropdownButton.vue';
import NavLink from '@/components/NavLink.vue';
import Link from '@/components/Link.vue';
import ResponsiveNavLink from '@/components/ResponsiveNavLink.vue';
import axios from 'axios';
import { sharedProps } from '@laravext/vue';
import { privacy } from '@/composables/usePrivacy'
import Fa from '@/components/Fa.vue';
import { useI18n } from 'vue-i18n';
const { locale: i18nLocale } = useI18n();

const { user } = sharedProps().auth;
const initialState = sharedProps().auth?.user?.privacy;

const locales = {
    en: {
        locale: 'en',
        flag: '/images/flags/us.svg',
    },
    pt: {
        locale: 'pt',
        flag: '/images/flags/br.svg',
    },
}

if (initialState !== undefined) {
    privacy.setActive(initialState)
}

const handleTogglePrivacy = () => {
    let state = privacy.active;

    privacy.toggle();

    axios.put('/api/auth/user', {
        privacy: !state
    });
}

const handleLocaleChange = async (locale) => {
    i18nLocale.value = locale;

    await axios.put('/api/auth/user', {
        locale
    });
};

const logout = async () => {
    await axios.post('/api/auth/logout');
    window.location.href = '/';
};

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <Link routeName='admin.dashboard'>
                                <ApplicationLogo
                                    class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>

                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink routeName="admin.dashboard">
                                    Dashboard
                                </NavLink>
                                <NavLink routeName="admin.teams">
                                    {{ $t('Teams') }}
                                </NavLink>
                                <NavLink routeName="admin.developers">
                                    {{ $t('Developers') }}
                                </NavLink>
                                <NavLink routeName="admin.projects">
                                    {{ $t('Projects') }}
                                </NavLink>
                                <NavLink routeName="admin.companies">
                                    {{ $t('Companies') }}
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ms-6">
                            <!-- Settings Dropdown -->
                            <div class="cursor-pointer px-4" @click="handleTogglePrivacy">
                                <Fa :icon="privacy.active ? 'fa-eye-slash' : 'fa-eye'"
                                    class=" text-gray-400 dark:text-gray-500" />
                            </div>
                            <Dropdown align="right" width="24">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button type="button"
                                            class="inline-flex items-center px-2 py-2 border border-transparent">
                                            <img :src="locales[$i18n.locale].flag" class="w-[20px]" />
                                            <!-- <Fa icon="fa-caret-down" class="ml-2" size="sm" /> -->
                                            <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <DropdownButton v-for="locale in Object.values(locales)"
                                        @click="handleLocaleChange(locale.locale)">
                                        <span class="flex items-center space-x-2">
                                            <img :src="locale.flag" class="w-[30px]" /> <span>{{
                                                locale.locale.toUpperCase() }}</span>
                                        </span>
                                    </DropdownButton>
                                </template>
                            </Dropdown>
                            <div class="ms-2 relative">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button type="button"
                                                class="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                {{ user.name }}

                                                <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownButton @click="logout">
                                            {{ $t('Log Out') }}
                                        </DropdownButton>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <div class="cursor-pointer px-3">
                                <Fa @click="handleTogglePrivacy" :icon="privacy.active ? 'fa-eye-slash' : 'fa-eye'"
                                    class=" text-gray-400 dark:text-gray-500" />
                            </div>

                            <Dropdown align="right" width="24">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button type="button"
                                            class="inline-flex items-center px-2 py-2 border border-transparent">
                                            <img :src="locales[$i18n.locale].flag" class="w-[20px]" />
                                            <Fa icon="fa-caret-down" class="ml-2" size="sm" />
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <DropdownButton v-for="locale in Object.values(locales)"
                                        @click="handleLocaleChange(locale.locale)">
                                        <span class="flex items-center space-x-2">
                                            <img :src="locale.flag" class="w-[30px]" /> <span>{{
                                                locale.locale.toUpperCase() }}</span>
                                        </span>
                                    </DropdownButton>
                                </template>
                            </Dropdown>


                            <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                                class="inline-flex items-center justify-center p-3 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex': !showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex': showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink routeName='admin.dashboard'>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink routeName='admin.teams'>
                            {{ $t('Teams') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink routeName='admin.developers'>
                            {{ $t('Developers') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink routeName='admin.projects'>
                            {{ $t('Projects') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink routeName='admin.companies'>
                            {{ $t('Companies') }}
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                                {{ user.name }}
                            </div>
                            <div class="font-medium text-sm text-gray-500">{{ user.email }}</div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink @click="logout">
                                {{ $t('Log Out') }}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

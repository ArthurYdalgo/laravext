<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Link from '@/components/Link.vue';
const { laravext } = defineProps(['laravext'])

const { shared_props } = laravext;
</script>

<template>
    <div class="min-h-screen bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div
            class=" flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
            <div class=" w-full px-6 lg:max-w-7xl">
                <header class="gap-2 py-4 ">
                    <nav class="-mx-3 flex flex-1 justify-end">
                        <Link routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Home
                        </Link>
                        <Link routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Our Projects
                        </Link>
                        <Link routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Our Teams
                        </Link>
                        <Link routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Contact
                        </Link>
                        <span class="text-black/50 py-2 dark:text-white/50">|</span>

                        <Link v-if="shared_props.auth.user" routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Dashboard
                        </Link>



                        <Link v-if="!shared_props.auth.user" routeName="login"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Log in
                        </Link>

                        <Link v-if="!shared_props.auth.user" routeName="register"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Register
                        </Link>

                    </nav>
                </header>

            </div>
        </div>

        <div class="px-16 min-h-[75vh]">
            <slot />
        </div>

        <footer class="py-6 text-center text-sm text-black dark:text-white/70">
            <span>Powered by <a href="https://laravel.com" class="text-blue-500" target="_blank">Laravel</a> and <a href="https://laravext.dev" class="text-blue-500" target="_blank">Laravext</a></span>
            <br>
            <span>Made with <span class="text-red-600 text-xs">❤</span> and <span class="text-blue-600">🥤</span></span>
        </footer>
    </div>
</template>

<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Link from '@/components/Link.vue';
const { laravext } = defineProps(['laravext'])

const { shared_props } = laravext;
</script>

<template>
    <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <img id="background" class="absolute -left-20 top-0 max-w-[877px]"
            src="https://laravel.com/assets/img/welcome/background.svg" />
        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
            <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                <header class=" gap-2 py-10 ">
                    <nav class="-mx-3 flex flex-1 justify-end">
                        <span class="text-black/50 py-2 dark:text-white/50">|</span>
                        
                        <Link routeName="dashboard"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Dashboard
                        </Link>

                        

                        <Link routeName="login"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Log in
                        </Link>

                        <Link routeName="register"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Register
                        </Link>

                    </nav>
                </header>

                <slot />

                <footer class="py-16 text-center text-sm text-black dark:text-white/70">
                    Made with <span class="text-red-600">❤</span> and <span class="text-blue-600">🥤</span>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Link from '@/components/Link.vue';

const {routeName, href, active} = defineProps({
    routeName: {
        type: String,
        required: false,
    },
    href: {
        type: String,
        required: true,
    },
    active: {
        type: [Boolean, null, undefined],
        required: false,
        default: null,
    },
});


const classes = computed(() =>
    (active !== null ? active : (routeName && route().has(routeName) && route().current(routeName)) || (href && navigator.location.href.includes(href)))
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out'
);
</script>

<template>
    <Link :routeName="routeName" :href="href" :class="classes">
        <slot />
    </Link>
</template>

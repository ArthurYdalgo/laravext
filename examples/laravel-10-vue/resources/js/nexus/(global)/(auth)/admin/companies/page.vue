<script setup>
import { sharedProps } from '@laravext/vue';
</script>
<template>
    <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">Companies</h2>
        </div>
    </header>

    <div>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">You're logged in, {{ sharedProps().auth.user.first_name }}!</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
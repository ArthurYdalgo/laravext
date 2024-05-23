<script setup>
import { sharedProps } from '@laravext/vue';

import Header from '@/components/Header.vue';

</script>
<template>
    <Header>Dashboard</Header>

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
<script setup>
import { sharedProps } from '@laravext/vue';

import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';

</script>
<template>
    <Header>Dashboard</Header>

    <PageContent>
        <div class="p-6 text-gray-900 dark:text-gray-100">{{$t("You're logged in")}}, {{ sharedProps().auth?.user.first_name }}! (Vue)
        </div>
    </PageContent>
</template>
<script>
</script>
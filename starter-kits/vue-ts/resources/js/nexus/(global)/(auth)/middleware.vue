<script setup>
import { visit } from '@laravext/vue3';
import { inject } from 'vue';
const $sharedProps = inject('$sharedProps');

if (!$sharedProps().auth?.user) {
    visit('/');
}
</script>
<template>
    <slot v-if="$sharedProps().auth?.user"></slot>
</template>
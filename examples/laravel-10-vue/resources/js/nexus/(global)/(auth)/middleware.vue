<script setup>
import { sharedProps } from '@laravext/vue';

if (!sharedProps().auth.user) {
  window.location.href = '/'
}
</script>
<template>
  <slot v-if="sharedProps().auth.user"></slot>
  <div v-else>
    <div class="flex justify-center items-center h-[75vh]">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold mb-4">You're trespassing...</h1>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

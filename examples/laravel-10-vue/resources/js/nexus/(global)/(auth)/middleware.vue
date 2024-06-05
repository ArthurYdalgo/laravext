<script setup>
import { sharedProps } from '@laravext/vue';

if (!sharedProps().auth?.user) {
  window.location.href = '/'
}
</script>
<template>
  <slot v-if="sharedProps().auth?.user"></slot>
  <div v-else>
    <div class="flex justify-center items-center h-[75vh]">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold mb-4">I'm sorry Dave, I'm afraid I can't let you do that...</h1>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

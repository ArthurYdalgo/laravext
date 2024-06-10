<script setup>
import ErrorBoundary from "@/components/ErrorBoundary.vue";

const doSomething = () => {
  // window.location.reload();
  
};

</script>
<template>
  <ErrorBoundary :onError="doSomething">
    <slot></slot>

    <template v-slot:fallback>
      <span>Something went wrong... Oopsie daisy</span>
    </template>
    
  </ErrorBoundary>
</template>

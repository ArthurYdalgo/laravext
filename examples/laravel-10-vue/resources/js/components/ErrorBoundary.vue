<script setup>
import { onErrorCaptured, ref } from "vue";
const { onError } = defineProps(["onError"]);

let errorWasCaptured = ref(false);

onErrorCaptured((error, vm, info) => {
  errorWasCaptured.value = true;

  console.log("Error captured in error component: ", error);

  if (onError) {
    onError();
  }
});
</script>
<template>
  <slot name="default" v-if="!errorWasCaptured"></slot>
  <slot name="fallback" v-else></slot>
</template>
<script setup>

const props = defineProps(['laravext'])
console.log("loading", props.laravext)
</script>
<template>
  Loading Pai
  <br />
  <slot></slot>
  <br /> 
  !Loading Pai
</template>

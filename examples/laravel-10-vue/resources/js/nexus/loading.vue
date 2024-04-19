<script setup>

const props = defineProps(['laravext'])
console.log("loading", props.laravext)
</script>
<template>
  Loading 
  <br />
  <slot></slot>
</template>

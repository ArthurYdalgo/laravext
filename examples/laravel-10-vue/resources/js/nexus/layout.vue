<script setup>

const props = defineProps(['laravext'])
console.log("layout", props.laravext)
</script>
<template>
  Layout 
  <br />
  <slot></slot>
</template>

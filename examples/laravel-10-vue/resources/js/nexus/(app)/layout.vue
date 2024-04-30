<script setup>

const props = defineProps(['laravext'])
console.log("layout", props.laravext)
</script>
<template>
  Layout Pai
  <br />
  <slot></slot>
  <br /> 
  !Layout Pai
</template>

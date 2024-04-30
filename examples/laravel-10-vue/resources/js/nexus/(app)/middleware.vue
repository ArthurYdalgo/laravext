<script setup>

const props = defineProps(['laravext'])
console.log("middleware", props.laravext)
</script>
<template>
  Middleware 
  <br /> 
  <slot></slot>
  <br /> 
  !Middleware
</template>

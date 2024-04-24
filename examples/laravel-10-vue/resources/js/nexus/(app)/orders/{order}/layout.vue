<script setup>

const props = defineProps(['laravext'])
console.log("layout", props.laravext)
</script>
<template>
  Layout Order/{Order}
  <br />
  <slot></slot>
</template>

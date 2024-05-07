<script setup>
const {laravext} = defineProps(['laravext'])
const {shared_props} = laravext;

if(!shared_props.auth.user){
    console.log('Not Authenticated')
    window.location.href = '/'
}
</script>
<template>
  <slot v-if="shared_props.auth.user"></slot>
  <div v-else>
    <h1>Redirecting...</h1>
  </div>
</template>

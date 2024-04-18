<script setup>
import { privacy } from '@/composables/usePrivacy'

const props = defineProps(['laravext'])
console.log(props.laravext)

</script>
<template>
  Main {{ privacy.active ? '****@****.com' : "email@email.com" }}
</template>
<script>

</script>
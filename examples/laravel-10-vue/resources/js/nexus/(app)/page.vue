<script setup>
import { privacy } from '@/composables/usePrivacy'
import { inject } from 'vue'
const $cookies = inject('$cookies');
const props = defineProps(['laravext'])

const causeError = () => {
    throw new Error('This is an error')
}

</script>
<template>
    Main {{ privacy.active ? '****@****.com' : "email@email.com" }}
    {{ $t('Hello!') }}
    <br/>
    <button @click="causeError" >Click me to cause an error</button>
</template>
<script>
</script>
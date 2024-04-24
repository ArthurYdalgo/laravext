<script setup>
import { privacy } from '@/composables/usePrivacy'
import { defineProps, inject } from 'vue'
const $cookies = inject('$cookies');
const props = defineProps(['laravext'])



const causeError = () => {
    throw new Error('This is an error')
}

</script>
<template>
    Main {{ privacy.active ? '****@****.com' : "email@email.com" }}
    {{ $t('message.hello') }}
    
    <button @click="causeError" >Click me to cause an error</button>
</template>
<script>
</script>
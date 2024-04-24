<script setup>
import { privacy } from '@/composables/usePrivacy'
import { defineProps, inject } from 'vue'
const $cookies = inject('$cookies');
const props = defineProps(['laravext'])

console.log("page", props.laravext)

</script>
<template>
    Pedido #{{ props.laravext.route_params.order }} 
    <br/>{{ privacy.active ? '****@****.com' : "email@email.com" }}
    {{ $t('message.hello') }}
    
</template>
<script>
</script>
<script setup>
import { privacy } from '@/composables/usePrivacy'
import axios from 'axios';
const {initialState, laravext} = defineProps(['initialState', 'laravext'])

if(initialState !== undefined) {
    privacy.setActive(initialState)
}

const handleToggle = () => {
    privacy.toggle();

    axios.put('/api/auth/user/privacy', {
        privacy: privacy.active
    });
}

</script>
<template>
    <span @click="handleToggle" class="cursor-pointer">
        {{ privacy.active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On' }}
    </span>
</template>
  
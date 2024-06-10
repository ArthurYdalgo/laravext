<script setup>
import { privacy } from '@/composables/usePrivacy'
import axios from 'axios';

const {initialState} = defineProps(['initialState'])

if(initialState !== undefined) {
    privacy.setActive(initialState)
}

const handleTogglePrivacy = () => {
    let state = privacy.active;

    privacy.toggle();

    axios.put('/api/auth/user', {
        privacy: !state
    });
}

</script>
<template>
    <span @click="handleTogglePrivacy" class="cursor-pointer">
        {{ privacy.active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On' }}
    </span>
</template>
  
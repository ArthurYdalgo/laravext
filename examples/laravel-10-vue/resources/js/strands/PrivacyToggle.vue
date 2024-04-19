<script setup>
import { privacy } from '@/composables/usePrivacy'
const props = defineProps(['initialState'])

if(props.initialState !== undefined) {
    privacy.setActive(props.initialState)
}

console.log("PrivacyToggle Component", {
    props: {
        initialState: props.initialState
    }
})

</script>
<template>
    <span @click="privacy.toggle" class="cursor-pointer">
        {{ privacy.active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On' }}
    </span>
</template>
  
<script setup>
import { Dropdown, Tooltip, Menu, vTooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

defineProps({
    text: {
        type: String,
        default: '',
    },
    condition: {
        type: Boolean,
        default: true,
    }
});

</script>

<template>
    <slot v-if="!condition" />
    <Tooltip v-else>
        <slot />
        <template #popper>
            {{ text }}
        </template>
    </Tooltip>
</template>
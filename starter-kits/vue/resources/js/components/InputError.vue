<script setup>
import { computed } from 'vue';

defineProps(['message']);

</script>
<template>
    <div v-show="message">
        <p class="text-sm text-red-600">
            {{ Array.isArray(message) ? message.join(', ') : message }}
        </p>
    </div>
</template>

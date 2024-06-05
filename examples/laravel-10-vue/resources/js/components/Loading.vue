<script setup>
const props = defineProps({
    condition: {
        type: Boolean,
        required: false,
        default: true,
    },
});

</script>

<template>
    <div v-if="props.condition" class="absolute inset-0 flex items-center justify-center">
        <div class="loader"></div>
    </div>
</template>

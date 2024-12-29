<script setup>
const props = defineProps({
    classes: {
        type: String,
        required: false,
        default: ''
    },
});
</script>

<template>
    <div :href="href" :class="`block w-full ps-3 pe-4 py-2 border-l-4 hover:cursor-pointer border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out ${props.classes}`">
        <slot />
    </div>
</template>

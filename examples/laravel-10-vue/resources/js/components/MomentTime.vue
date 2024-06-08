<script setup>
import MomentDateTime from './MomentDateTime.vue';

const props = defineProps({
    time: { type: String, required: true },
    format: { type: String, default: 'HH:mm' },
    fallback: { type: String, default: '--:--' },
    style: { type: String, required: false },
    className: { type: String, required: false },
});

const dateTime = props.time;
</script>
<template>
    <MomentDateTime :dateTime="dateTime" :format="format" :style="style" :fallback="fallback" :className="className" />
</template>

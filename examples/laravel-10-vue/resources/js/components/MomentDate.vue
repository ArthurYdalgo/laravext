<script setup>
import MomentDateTime from './MomentDateTime.vue';

const props = defineProps({
    date: { type: String, required: true },
    format: { type: String, default: 'DD/MMM/YYYY' },
    fallback: { type: String, default: '--/---/----' },
    style: { type: String, required: false },
    className: { type: String, required: false },
});

const dateTime = props.date;
</script>
<template>
    <MomentDateTime :dateTime="dateTime" :format="format" :style="style" :fallback="fallback" :className="className" />
</template>
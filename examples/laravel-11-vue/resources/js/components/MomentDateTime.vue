<script setup>
import moment from "moment";

const props = defineProps({
    dateTime: { type: String, required: false },
    date: { type: String, required: false },
    format: { type: String, default: 'DD/MMM/YYYY HH:mm' },
    fallback: { type: String, default: '--/---/---- --:--' },
    style: { type: String, required: false },
    className: { type: String, required: false },
});

const dateTime = props.dateTime ?? props.date;
</script>
<template>
    <span class="font-mono">{{ dateTime ? moment(dateTime).format(format) : fallback }}</span>
</template>
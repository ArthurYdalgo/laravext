<script setup>
const props = defineProps({
    routeName: {
        type: String,
        required: false,
    },
    href: {
        type: String,
        required: false,
    },
    classes: {
        type: String,
        required: false,
    },
});

let href = props.href ? props.href : (props.routeName && route().has(props.routeName) ? route(props.routeName) : '');
let classes = props.classes ?? '';

</script>

<template>
    <a :href="href" :class="classes">
        <slot />
    </a>
</template>

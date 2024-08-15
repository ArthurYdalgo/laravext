<script setup>
import { Link } from '@laravext/vue3'

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
    <Link
        :href="href"
        :class="classes"
    >
        <slot />
    </Link>
</template>

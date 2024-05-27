<script setup>

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add all solid icons to the library so they can be used
library.add(fas);
library.add(far);
library.add(fab);

const props = defineProps({
    icon: {
        type: [Object, Array],
        required: true,
    },
    size: {
        type: String,
        default: '1x',
    },
    class: {
        type: String,
        default: '',
    },
});

</script>
<template>
    <FontAwesomeIcon :icon="icon" :size="size" :class="class" />
</template>

<script setup>

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'

// Add all solid icons to the library so they can be used
library.add(faPlus, faTrash, faEye, faEyeSlash)

// In case you want to add all icons from the solid style, which is not recommended
// library.add(fas)

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

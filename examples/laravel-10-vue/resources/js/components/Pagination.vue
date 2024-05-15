<script setup>
import { ref, computed } from 'vue';
import Link from '@/components/Link.vue';

const props = defineProps({
    meta: {
        type: [Object],
        required: false,
    },
});

const emit = defineEmits(['paginate-to']);

const perPageOptions = [10, 25, 50, 100, 200];
const perPage = ref(props.meta.per_page);
const currentPage = ref(props.meta.current_page);

const pages = computed(() => {
    const total = props.meta.last_page;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (currentPage.value <= 3) return [1, 2, 3, '...', total];
    if (currentPage.value >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', total];
});

const paginateTo = () => {
    emit('paginate-to', { page: currentPage.value, perPage: perPage.value });
};

const onBlur = () => {
    paginateTo();
};
</script>

<template>
    <div>
        <ul>
            <li v-for="page in pages" :key="page" :class="{ 'current-page': page === currentPage }">
                <button v-if="typeof page === 'number'" @click="currentPage = page; paginateTo()">{{ page }}</button>
                <span v-else>{{ page }}</span>
            </li>
        </ul>
        <select v-model="perPage" @change="paginateTo">
            <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <input v-if="pages.length > 5" type="number" v-model="currentPage" @blur="onBlur" />
    </div>
</template>
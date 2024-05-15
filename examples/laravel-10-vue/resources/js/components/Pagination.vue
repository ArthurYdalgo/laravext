<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    meta: {
        type: [Object],
        required: false,
    },
});

const emit = defineEmits(['paginate-to']);

const perPageOptions = [5, 10, 25, 50, 100, 200];
const perPage = ref(props.meta.per_page);
const currentPage = ref(props.meta.current_page);
const pageRange = 1;

const pages = computed(() => {
    const total = props.meta.last_page;
    let pagesArray = [];

    if (total <= 2 * pageRange + 1) {
        return Array.from({ length: total }, (_, i) => i + 1);
    } else {
        // Always include the first page
        pagesArray.push(1);

        // If current page is less than or equal to pageRange, show the first (2 * pageRange + 1) pages
        if (currentPage.value <= pageRange + 1) {
            pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => i + 2));
        } 
        // If current page is in the last pageRange pages, show the last (2 * pageRange + 1) pages
        else if (currentPage.value > total - pageRange) {
            pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => total - 2 * pageRange + i));
        } 
        // In all other cases, show the current page and pageRange pages on either side
        else {
            pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => currentPage.value - pageRange + i));
        }

        // Always include the last page if it's not already in the array
        if (!pagesArray.includes(total)) {
            pagesArray.push(total);
        }

        // Insert ellipsis where there's a gap in the sequence
        for (let i = 1; i < pagesArray.length; i++) {
            if (pagesArray[i] - pagesArray[i - 1] >= 2) {
                pagesArray.splice(i, 0, '...');
            }
        }

        return pagesArray;
    }
});

const paginateTo = () => {
    emit('paginate-to', { page: currentPage.value, perPage: perPage.value });
};

const handleUpdatePerPage = () => {
    currentPage.value = 1;
    paginateTo();
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
        <select v-model="perPage" @change="handleUpdatePerPage">
            <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <input type="number" v-model="currentPage" :max="props.meta.last_page" @blur="onBlur" />
    </div>
</template>
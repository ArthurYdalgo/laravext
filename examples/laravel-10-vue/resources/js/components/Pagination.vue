<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    meta: {
        type: [Object],
        required: false,
    },
    hidePageInput: {
        type: Boolean,
        default: false,
    },
    hidePerPageSelector: {
        type: Boolean,
        default: false,
    },
    hidePageSelector: {
        type: Boolean,
        default: false,
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
    if (currentPage.value > props.meta.last_page) {
        currentPage.value = props.meta.last_page;
    }
    paginateTo();
};
</script>

<template>
    <div class="flex items-center justify-between">
        <div v-if="!hidePageSelector" class="flex items-center">
            <label for="page-selector" class="mr-2">Page:</label>
            <button @click="currentPage = 1; paginateTo()" :disabled="currentPage === 1" class="border border-gray-300 rounded px-3 py-2 cursor-pointer"><<</button>
            <button @click="currentPage--; paginateTo()" :disabled="currentPage === 1" class="border border-gray-300 rounded px-3 py-2 mr-3 cursor-pointer"><</button>
            <ul class="flex list-none border border-gray-300 rounded overflow-hidden">
                <li v-for="page in pages" :key="page" :class="{ 'bg-blue-500 text-white cursor-pointer': page === currentPage, 'text-gray-700 cursor-pointer': page !== currentPage }" class="px-3 py-2 border-r last:border-r-0" @click="if (typeof page === 'number') { currentPage = page; paginateTo(); }">
                    <button v-if="typeof page === 'number'" class="focus:outline-none w-full h-full">{{ page }}</button>
                    <span v-else>{{ page }}</span>
                </li>
            </ul>
            <button @click="currentPage++; paginateTo()" :disabled="currentPage === props.meta.last_page" class="border border-gray-300 rounded px-3 py-2 ml-3 cursor-pointer">></button>
            <button @click="currentPage = props.meta.last_page; paginateTo()" :disabled="currentPage === props.meta.last_page" class="border border-gray-300 rounded px-3 py-2 cursor-pointer">>></button>
        </div>
        <div class="flex items-center">
            <label v-if="!hidePerPageSelector" for="per-page-selector" class="mr-2">Per Page:</label>
            <select v-if="!hidePerPageSelector" id="per-page-selector"  v-model="perPage" @change="handleUpdatePerPage" class="border border-gray-300 rounded px-3 py-2 pr-8">
                <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
            </select>
            <span v-if="!hidePerPageSelector && !hidePageInput" class="text-black/50 py-2 dark:text-white/50 mx-4">|</span>
            <label v-if="!hidePageInput" for="current-page-input" class="mr-2">Current Page:</label>
            <input v-if="!hidePageInput" id="current-page-input" type="number" v-model="currentPage" :max="props.meta.last_page" @blur="onBlur" class="border border-gray-300 w-24 rounded px-3 py-2" />
        </div>
    </div>
</template>
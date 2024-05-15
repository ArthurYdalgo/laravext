<script setup>
import { sharedProps } from '@laravext/vue';
import { onMounted, reactive } from 'vue';
import Pagination from '@/components/Pagination.vue';

const data = reactive({
    developers: [],
    filters: {
        search: '',
    },
    page: 1,
    per_page: 10,
    loading: true,
});

const paginateTo = ({ page, perPage }) => {
    data.page = page;
    data.per_page = perPage;
    console.log(data.page, data.per_page);

    fetchRecords();
};

const fetchRecords = () => {
    data.loading = true;



    axios.get('/api/developers', {
        params: {
            page: data.page,
            per_page: data.per_page,
            search: data.filters.search,
        },
    })
        .then(response => {
            data.developers = response.data;
            data.loading = false;
        })
        .catch(error => {
            console.error(error);
            data.loading = false;
        });
};

onMounted(async () => {
    fetchRecords();
});

</script>
<template>
    <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight">Developers</h2>
        </div>
    </header>

    <div>
        <div class="py-6">
            <div class="mx-auto sm:px-6 lg:px-4">
                <div
                    class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900 dark:text-gray-100">

                    <Pagination v-if="!data.loading || data.developers?.meta" @paginate-to="paginateTo" :meta="data.developers?.meta ?? {}" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
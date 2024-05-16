<script setup>
import { onMounted, reactive, ref } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { debounce, _ } from 'lodash';

const pagination = reactive({
    data: [],
    meta: {},
    loading: true,
    page: 1,
    per_page: 10
});

const filters = reactive({
    search: '',
});

const paginateTo = ({ page, perPage }) => {
    pagination.page = page;
    pagination.per_page = perPage;

    fetchRecords();
};

const fetchRecords = () => {
    pagination.loading = true;

    axios.get('/api/developers', {
        params: {
            page: pagination.page,
            per_page: pagination.per_page,
            search: filters.search,
        },
    })
        .then(response => {
            pagination.data = response.data.data;
            pagination.meta = response.data.meta;
            pagination.loading = false;
        })
        .catch(error => {
            console.error(error);
            pagination.loading = false;
        });
};

const debouncedFetchRecords = debounce(() => {
    pagination.page = 1;

    fetchRecords();
}, 1000);

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
                <div v-if="pagination.loading" class="absolute inset-0 flex items-center justify-center">
                    <div class="loader"></div>
                </div>
                <div :class="{ 'opacity-50': pagination.loading }"
                    class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900 dark:text-gray-100">

                    <div class="flex items
                    -center justify-between mb-4">
                        <div class="flex items
                        -center">

                            <input type="text" id="search" v-model="filters.search" placeholder="Search"
                                class="border border-gray-300 rounded px-3 py-2" @input="debouncedFetchRecords" />
                        </div>
                        <div class="flex items
                        -center">
                        </div>
                    </div>


                    <table class="min-w-full divide-y divide-gray-200 border my-4">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th
                                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th
                                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-700"
                                v-for="resource in pagination.data" :key="resource.id">
                                <td class="border-t px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                        {{ resource.id }}
                                    </div>
                                </td>
                                <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                        {{ resource.name }}
                                    </div>
                                </td>
                                <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 text-gray-900">
                                        {{ resource.email }}
                                    </div>
                                </td>
                                <td
                                    class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <Link :href="`/admin/developers/${resource.id}`"
                                        class="text-indigo-600 hover:text-indigo-900">View</Link>
                                    <Link :href="`/admin/developers/${resource.id}/edit`"
                                        class="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                     <Pagination
                                v-if="(!pagination.loading || !_.isEmpty(pagination.meta))"
                                 @paginate-to="paginateTo"
                                :pagination="pagination ?? {}" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
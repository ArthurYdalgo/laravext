<script setup>
import { sharedProps } from '@laravext/vue';
import { onMounted, reactive } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { debounce } from 'lodash';

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

const debouncedFetchRecords = debounce(fetchRecords, 1000);

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

                    <div class="flex items
                    -center justify-between mb-4">
                        <div class="flex items
                        -center">

                            <input type="text" id="search" v-model="data.filters.search" placeholder="Search"
                                class="border border-gray-300 rounded px-3 py-2" @input="debouncedFetchRecords"
                                @blur="fetchRecords" />
                        </div>
                        <div class="flex items
                        -center">
                            <Link routeName="admin.developers.create" class="bg-blue-500 text-white rounded px-3 py-2">
                            Create Developer</Link>
                        </div>
                    </div>

                    <Pagination v-if="(!data.loading || data.developers?.meta) && data.developers?.meta.per_page > 10" :hide-page-input="true" :hide-per-page-selector="true" @paginate-to="paginateTo"
                        :meta="data.developers?.meta ?? {}" />

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
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                                v-for="developer in data.developers.data" :key="developer.id">
                                <td class="border-t px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                        {{ developer.id }}
                                    </div>
                                </td>
                                <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                        {{ developer.name }}
                                    </div>
                                </td>
                                <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 text-gray-500">
                                        {{ developer.email }}
                                    </div>
                                </td>
                                <td
                                    class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <Link :href="`/admin/developers/${developer.id}`"
                                        class="text-indigo-600 hover:text-indigo-900">View</Link>
                                    <Link :href="`/admin/developers/${developer.id}/edit`"
                                        class="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Pagination v-if="!data.loading || data.developers?.meta" @paginate-to="paginateTo"
                        :meta="data.developers?.meta ?? {}" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<script setup>
import { onMounted, reactive, ref, inject } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { debounce } from 'lodash';
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import PageContent from '@/components/PageContent.vue';
import Loading from '@/components/Loading.vue';
import { useI18n } from 'vue-i18n';
import MomentDate from '@/components/MomentDate.vue';
const { t } = useI18n();
const swal = inject('$swal')

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

    fetchResources();
};

const fetchResources = () => {
    pagination.loading = true;

    axios.get('/api/projects', {
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

const destroyResource = (id) => {
    swal({
        title: t('Are you sure?'),
        icon: 'warning',
        confirmButtonText: t('Yes, delete it!'),
        cancelButtonText: t('No, cancel!'),
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        showCancelButton: true,
        showCloseButton: true,

    })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/projects/${id}`)
                    .then(() => {
                        fetchResources();
                        swal(t('Record deleted!'), t('The project has been deleted.'), 'success');
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the project.'), 'error');
                    });
            }
        });
}

const debouncedFetchResources = debounce(() => {
    pagination.page = 1;

    fetchResources();
}, 1000);

onMounted(async () => {
    fetchResources();
});

</script>
<template>
    <Header>
        {{$t('Projects')}}
    </Header>

    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link routeName="admin.projects.create">
        <PrimaryButton>{{ $t('Create') }}</PrimaryButton>
        </Link>
    </div>

    <PageContent>
        <Loading v-if="pagination.loading" />

        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">

                <input type="text" id="search" v-model="filters.search" :placeholder="$t('Search')"
                    class="border border-gray-300 rounded px-3 py-2" @input="debouncedFetchResources" />
            </div>
            <div class="flex items-center">
            </div>
        </div>


        <table :class="{ 'opacity-50': pagination.loading }" class="min-w-full divide-y divide-gray-200 border my-4">
            <thead>
                <tr>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th
                        class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{ $t('Name') }}
                    </th>
                    <th
                        class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{ $t('Team') }}
                    </th>
                    <th
                        class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{ $t('Company') }}
                    </th>
                    <th
                        class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{ $t('Created At') }}
                    </th>
                    <th
                        class="border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        {{$t('Actions')}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700"
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
                        <div class="text-sm leading-5 font-medium text-gray-900">
                            <div class="text-sm leading-5 text-gray-900">
                                <Link v-if="resource.team" class="text-blue-600"
                                    :href="`/admin/teams/${resource.team?.id}`">
                                {{ resource.team?.name }}
                                </Link>
                                <span v-else>--</span>
                            </div>
                        </div>
                    </td>
                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                            <div class="text-sm leading-5 text-gray-900">
                                <Link v-if="resource.company" class="text-blue-600" :href="`/admin/companies/${resource.company?.id}`"> {{ resource.company?.name }}
                                </Link>
                                <span v-else>--</span>
                            </div>
                        </div>
                    </td>
                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                            <MomentDate :date="resource.created_at" />
                        </div>
                    </td>
                    <td
                        class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2">
                        <Link :href="`/admin/projects/${resource.id}`">
                        <PrimaryButton>{{$t('Show')}}</PrimaryButton>
                        </Link>
                        <Link :href="`/admin/projects/${resource.id}/edit`">
                        <SecondaryButton>{{ $t('Edit') }}</SecondaryButton>
                        </Link>
                        <DangerButton @click="destroyResource(resource.id)" class="hover:text-red-900">
                            {{$t('Delete')}}</DangerButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagination v-if="!pagination.loading" @paginate-to="paginateTo" :pagination="pagination ?? {}" />
    </PageContent>
</template>
<style scoped></style>
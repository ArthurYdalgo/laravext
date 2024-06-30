<script setup>
import Fa from '@/components/Fa.vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { privacy } from '@/composables/usePrivacy';
import { debounce } from 'lodash-es';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import DangerButton from '@/components/DangerButton.vue';
import Link from '@/components/Link.vue';
import { useI18n } from 'vue-i18n';
import Tooltip from '@/components/Tooltip.vue';
const { t } = useI18n();
const swal = inject('$swal')
const routeParams = inject('$routeParams');

// Reactive form state
const form = reactive({
    data: {
        name: '',
        developers: [],
    },
    errors: [],
    loading: true,
});

// Fetch team data on component mount
onMounted(() => {
    form.loading = true;
    axios.get(`/api/teams/${routeParams().team}`)
        .then(response => {
            form.data = response.data;
            form.loading = false;
        })
        .catch(() => {
            swal(t('Error!'), 'Failed to load team data.', 'error');
            form.loading = false;
        });
});

// Update team information
const updateResource = () => {
    form.errors = {};

    const data = {
        name: form.data.name,
        developer_ids: form.data.developers.map(developer => developer.id),
    };

    return axios.put(`/api/teams/${routeParams().team}`, data)
        .then(() => {
            swal(t('Record updated!'), t('The team has been updated.'), 'success').then(() => {
                window.location.href = route('admin.teams.team', { team: routeParams().team });
            });
        })
        .catch(() => {
            swal(t('Error!'), 'An error occurred while updating the team.', 'error');
        });
};

// Remove a developer from the team
const handleRemoveDeveloperFromTeam = (developer) => {
    form.data.developers = form.data.developers.filter(d => d.id !== developer.id);
};

// Modal state for adding a developer to the team
const addDeveloperToTeamModal = reactive({
    visible: false,
    loading: false,
    search: '',
    developers: []
});

// Close the add developer modal and reset its state
const closeAddDeveloperToTeamModal = () => {
    addDeveloperToTeamModal.visible = false;
    addDeveloperToTeamModal.search = '';
    addDeveloperToTeamModal.developers = [];
};

// Fetch developers not already in the team
const fetchDevelopers = () => {
    addDeveloperToTeamModal.loading = true;

    axios.get('/api/developers', {
        params: {
            per_page: 9,
            search: addDeveloperToTeamModal.search,
            filter: {
                not_team_ids: [routeParams().team].join(','),
                not_ids: form.data.developers.map(developer => developer.id).join(','),
            },
        },
    })
        .then(response => {
            addDeveloperToTeamModal.developers = response.data.data;
            addDeveloperToTeamModal.loading = false;
        })
        .catch(error => {
            console.error(error);
            addDeveloperToTeamModal.loading = false;
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
                axios.delete(`/api/teams/${id}`)
                    .then(() => {
                        swal(t('Record deleted!'), t('The team has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/teams';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the team.'), 'error');
                    });
            }
        });
}

// Debounce search to limit API requests
const debouncedSearchDevelopers = debounce(() => {
    if (addDeveloperToTeamModal.search.length == 0) {
        addDeveloperToTeamModal.developers = [];
        return;
    }
    fetchDevelopers();
}, 1000);

</script>
<template>
    <Header>{{ form.loading ? $t('Loading...') : `${$t('Edit team')} #${routeParams().team} - ${form.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/teams/${routeParams().team}`">
        <PrimaryButton>{{ $t('Show') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().team)" class="hover:text-red-900">{{ $t('Delete') }}
        </DangerButton>
    </div>
    <Loading v-if="form.loading" />
    <PageContent v-else>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form">
            <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />

            <span class="text-lg font-bold">{{ $t('Developers') }}: <PrimaryButton
                    @click="addDeveloperToTeamModal.visible = true" class="bg-green-600" type="button">
                    <Fa icon="plus" />
                </PrimaryButton> </span>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <div class="bg-white rounded-lg shadow p-4"
                    v-for="developer in form.data.developers.sort((a, b) => a.name.localeCompare(b.name))"
                    :key="developer.id">
                    <div class="font-bold flex justify-between"><span>@{{ developer.username }}</span>
                        <Tooltip :text="$t('Click to remove the developer from the team')">
                        <Fa class="cursor-pointer" @click="handleRemoveDeveloperFromTeam(developer)" icon="fa-trash"
                            color="red" /></Tooltip>
                    </div>
                    <div class="border-b-2 border-gray-200 my-2"></div>
                    <div class="text-sm">{{$t('Name')}}: {{ $t(developer.name) }}</div>
                    <div class="text-sm">{{$t('Role')}}: {{ $t(developer.role_label) }}</div>
                    <div class="text-sm">{{ $t('Email: ') }} {{ privacy.active ? '***@***' : developer.email }}</div>
                </div>
            </div>
        </FormKit>
        <Modal :show="addDeveloperToTeamModal.visible" :closeable="true" @close="closeAddDeveloperToTeamModal"
            maxWidth="w-[75vw]">
            <div class="min-h-[50vh] p-6 shadow-none border-none">
                <h2 class="text-xl font-bold mb-2">{{ $t('Add developer to team') }}</h2>
                <TextInput class="w-full" v-model="addDeveloperToTeamModal.search" @input="debouncedSearchDevelopers"
                    :placeholder="$t('Type to search for a developer by email or name')" />
                <div>
                    <Loading v-if="addDeveloperToTeamModal.loading" />
                    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                        <div class="bg-white shadow rounded-lg p-4"
                            v-for="developer in addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name))"
                            :key="developer.id">
                            <div class="font-bold flex justify-between">@{{ developer.username }}<PrimaryButton
                                    @click="form.data.developers.push(developer); fetchDevelopers();" type="button">{{
                                        $t('Add') }}</PrimaryButton>
                            </div>
                            <div class="border-b-2 border-gray-200 my-2"></div>
                            <div class="text-sm">{{$t('Name')}}: {{ $t(developer.name) }}</div>
                            <div class="text-sm">{{$t('Role')}}: {{ $t(developer.role_label) }}</div>
                            <div class="text-sm">{{ $t('Email: ') }} {{ privacy.active ? '***@***' : developer.email }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </PageContent>
</template>
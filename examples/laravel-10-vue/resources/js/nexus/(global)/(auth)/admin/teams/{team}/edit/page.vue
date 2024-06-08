<script setup>
import Fa from '@/components/Fa.vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { privacy } from '@/composables/usePrivacy';
import { debounce } from 'lodash';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
const swal = inject('$swal')

const form = reactive({
    data: {
        name: '',
        developers: [],
    },
    errors: [],
    loading: true,
});

onMounted(() => {
    form.loading = true;

    axios.get(`/api/teams/${routeParams().team}`)
        .then(response => {
            form.data = {
                name: response.data.name,
                developers: response.data.developers
            };

            form.loading = false;
        });
});

const updateResource = () => {
    form.errors = {};

    let data = {
        name: form.data.name,
        developer_ids: form.data.developers.map(developer => developer.id),
    };

    return axios.put(`/api/teams/${routeParams().team}`, data)
        .then(() => {
            swal('Updated!', 'The team has been updated.', 'success').then(() => {
                window.location.href = route('admin.teams.team', { team: routeParams().team });
            });
        })
        .catch(error => {
            swal('Error!', 'An error occurred while updating the team.', 'error');
        });
};

const handleRemoveDeveloperFromTeam = (developer) => {
    form.data.developers = form.data.developers.filter(d => d.id !== developer.id);
};

const addDeveloperToTeamModal = reactive({
    visible: false,
    loading: false,
    search: '',
    developers: []
});

const closeAddDeveloperToTeamModal = () => {
    addDeveloperToTeamModal.visible = false;
    addDeveloperToTeamModal.search = '';
    addDeveloperToTeamModal.developers = [];
};

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

const debouncedSearchDevelopers = debounce(() => {

    if (addDeveloperToTeamModal.search.length == 0) {
        addDeveloperToTeamModal.developers = [];

        return;
    }

    fetchDevelopers();
}, 1000);

</script>
<template>
    <Header>{{ form.loading ? $t('Loading...') : `Edit team #${routeParams().team} - ${form.data.name}` }}</Header>
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
                    <div class="font-bold flex justify-between"><span>{{ developer.name }}</span>
                        <Fa class="cursor-pointer" @click="handleRemoveDeveloperFromTeam(developer)" icon="fa-trash"
                            color="red" />
                    </div>
                    <div class="border-b-2 border-gray-200 my-2"></div>
                    <div>Role: {{ $t(developer.role_label) }}</div>
                    <div>{{ $t('Email: ') }} {{ privacy.active ? '***@***' : developer.email }}</div>
                </div>
            </div>
        </FormKit>
        <Modal :show="addDeveloperToTeamModal.visible" :closeable="true" @close="closeAddDeveloperToTeamModal"
            maxWidth="w-[75vw]">
            <PageContent class="min-h-[50vh]">
                <h2 class="text-xl font-bold mb-2">{{ $t('Add developer to team') }}</h2>
                <TextInput class="w-full" v-model="addDeveloperToTeamModal.search" @input="debouncedSearchDevelopers"
                    :placeholder="$t('Type to search for a developer by email or name')" />
                <div>
                    <Loading v-if="addDeveloperToTeamModal.loading" />
                    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                        <div class="bg-white rounded-lg shadow p-4"
                            v-for="developer in addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name))"
                            :key="developer.id">
                            <div class="font-bold flex justify-between">{{ developer.name }}<PrimaryButton
                                    @click="form.data.developers.push(developer); fetchDevelopers();" type="button">{{
                                    $t('Add') }}</PrimaryButton>
                            </div>
                            <div class="border-b-2 border-gray-200 my-2"></div>
                            <div>Role: {{ $t(developer.role_label) }}</div>
                            <div>{{ $t('Email: ') }} {{ privacy.active ? '***@***' : developer.email }}</div>
                        </div>
                    </div>
                </div>
            </PageContent>
        </Modal>
    </PageContent>
</template>
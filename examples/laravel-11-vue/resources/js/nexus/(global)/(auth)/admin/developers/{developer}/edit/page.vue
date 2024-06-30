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
const { t } = useI18n();

const nexusProps = inject('$nexusProps');
const routeParams = inject('$routeParams');
const swal = inject('$swal')

// Reactive form state
const form = reactive({
    data: nexusProps().developer,
    errors: [],
    loading: true,
});

const developerRoles = nexusProps().developer_roles;

// Update team information
const updateResource = () => {
    form.errors = {};

    const data = {
        username: form.data.username,
        name: form.data.name,
        email: form.data.email,
        role: form.data.role,
        team_id: form.data.team_id === undefined ? null : form.data.team_id,
    };

    return axios.put(`/api/developers/${routeParams().developer.id}`, data)
        .then(() => {
            swal(t('Record updated!'), t('The developer has been updated.'), 'success').then(() => {
                window.location.href = route('admin.developers');
            });
        })
        .catch(() => {
            swal(t('Error!'), t('An error occurred while updating the developer.'), 'error');
        });
};

const loadTeam = (id, cachedOption) => {
    

    if (cachedOption) {
        return cachedOption;
    }

    if(form.data.team) {
        return {
            value: form.data.team.id,
            label: form.data.team.name,
        }
    }
}

const searchTeams = async ({ search, page, hasNextPage }) => {
    if (!search) {
        return []
    };

    const res = await axios.get(`/api/teams`, {
        params: {
            search
        }
    });

    if (res.data) {
        return res.data.data.map(team => ({
            value: team.id,
            label: team.name,
        }));
    }
    // If the request fails, we return an empty array.
    return []
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
                axios.delete(`/api/developers/${id}`)
                    .then(() => {
                        swal(t('Record deleted!'), t('The developer has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/developers';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the developer.'), 'error');
                    });
            }
        });
}

</script>
<template>
    <Header>{{ `${$t('Edit developer')} #${nexusProps().developer.id} - ${nexusProps().developer.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <DangerButton @click="destroyResource(nexusProps().developer.id)" class="hover:text-red-900">{{ $t('Delete') }}
        </DangerButton>
    </div>
    <PageContent>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required
                    id="name" :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />

                <FormKit validation-visibility="live" type="text" name="username" required id="username"
                    :label="$t('Username')" :placeholder="$t('cool_nickname')" v-model="form.data.username" />

                <FormKit validation-visibility="live" type="text" name="email" validation="email" required id="email"
                    :label="$t('Email')" :placeholder="`“${$t('Type the developer email')}”`"
                    v-model="form.data.email" />

                <FormKit type="select" name="role" required id="role" :label="$t('Role')" v-model="form.data.role"
                    :options="developerRoles" />

                <FormKit type="autocomplete" selection-removable :option-loader="loadTeam" name="team_id" :label="$t('Team')" v-model="form.data.team_id"
                    :placeholder="$t('Search for a team')" :options="searchTeams" popover />

            </div>
        </FormKit>
    </PageContent>
</template>
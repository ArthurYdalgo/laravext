<script setup>
import Fa from '@/components/Fa.vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { privacy } from '@/composables/usePrivacy';
import { debounce } from 'lodash';
import { nexusProps, routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import DangerButton from '@/components/DangerButton.vue';
import Link from '@/components/Link.vue';

const swal = inject('$swal')

// Reactive form state
const form = reactive({
    data: {
        name: '',
        email: '',
        role: '',
        team: null,
    },
    errors: [],
    loading: true,
});

const developerRoles = nexusProps().developer_roles;

// Fetch developer data on component mount
onMounted(() => {
    form.loading = true;
    axios.get(`/api/developers/${routeParams().developer}`)
        .then(response => {
            form.data = response.data;
            form.loading = false;
        })
        .catch(() => {
            swal('Error!', 'Failed to load developer data.', 'error');
            form.loading = false;
        });
});

// Update team information
const updateResource = () => {
    form.errors = {};

    const data = {
        name: form.data.name,
        email: form.data.email,
        role: form.data.role,
    };

    return axios.put(`/api/developers/${routeParams().developer}`, data)
        .then(() => {
            swal('Updated!', 'The developer has been updated.', 'success').then(() => {
                window.location.href = route('admin.developers');
            });
        })
        .catch(() => {
            swal('Error!', 'An error occurred while updating the developer.', 'error');
        });
};

const destroyResource = (id) => {
    swal({
        title: 'Are you sure?',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        showCancelButton: true,
        showCloseButton: true,

    })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/developers/${id}`)
                    .then(() => {
                        swal('Deleted!', 'The developer has been deleted.', 'success').then(() => {
                            window.location.href = '/admin/developers';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal('Error!', 'An error occurred while deleting the developer.', 'error');
                    });
            }
        });
}

</script>
<template>
    <Header>{{ form.loading ? $t('Loading...') : `Edit developer #${routeParams().developer} - ${form.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <DangerButton @click="destroyResource(routeParams().developer)" class="hover:text-red-900">Delete</DangerButton>
    </div>
    <Loading v-if="form.loading" />
    <PageContent v-else>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                    :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />
    
                <FormKit validation-visibility="live" type="text" name="email" validation="email" required id="email"
                    :label="$t('Email')" :placeholder="`“${$t('Type the developer email')}”`" v-model="form.data.email" />
    
                <FormKit type="select" name="role" required id="role" :label="$t('Role')" v-model="form.data.role" :options="developerRoles" />

                <FormKit disabled type="text" name="team" required id="team" :label="$t('Team')" :value="form.data.team?.name ?? '--'" />

            </div>
        </FormKit>
    </PageContent>
</template>
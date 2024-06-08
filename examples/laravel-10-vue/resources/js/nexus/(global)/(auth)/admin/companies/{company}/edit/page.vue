<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import DangerButton from '@/components/DangerButton.vue';

const swal = inject('$swal')

// Reactive form state
const form = reactive({
    data: {
        name: '',
        email: '',
        website: '',
    },
    errors: [],
    loading: true,
});

// Fetch company data on component mount
onMounted(() => {
    form.loading = true;
    axios.get(`/api/companies/${routeParams().company}`)
        .then(response => {
            form.data = response.data;
            form.loading = false;
        })
        .catch(() => {
            swal('Error!', 'Failed to load company data.', 'error');
            form.loading = false;
        });
});

// Update team information
const updateResource = () => {
    form.errors = {};

    const data = {
        name: form.data.name,
        email: form.data.email,
        website: form.data.website,
    };

    return axios.put(`/api/companies/${routeParams().company}`, data)
        .then(() => {
            swal('Updated!', 'The developer has been updated.', 'success').then(() => {
                window.location.href = route('admin.companies');
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
                axios.delete(`/api/companies/${id}`)
                    .then(() => {
                        swal('Deleted!', 'The company has been deleted.', 'success').then(() => {
                            window.location.href = '/admin/companies';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal('Error!', 'An error occurred while deleting the company.', 'error');
                    });
            }
        });
}

</script>
<template>
    <Header>{{ form.loading ? $t('Loading...') : `Edit company #${routeParams().company} - ${form.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">

        <DangerButton @click="destroyResource(routeParams().company)" class="hover:text-red-900">Delete</DangerButton>
    </div>
    <Loading v-if="form.loading" />
    <PageContent v-else>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                    :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />
    
                <FormKit validation-visibility="live" type="email" name="email" validation="email" required id="email"
                    :label="$t('Email')" :placeholder="`“${$t('cool-email@email.com')}”`" v-model="form.data.email" />

                    <FormKit validation-visibility="live" type="text" name="website" validation="url" required id="website"
                    :label="$t('Website')" :placeholder="`“${$t('cool-website.com')}”`" v-model="form.data.website" />

            </div>
        </FormKit>
    </PageContent>
</template>
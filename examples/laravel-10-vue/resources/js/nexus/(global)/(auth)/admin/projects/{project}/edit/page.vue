<script setup>
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { routeParams } from '@laravext/vue';
import { reactive,inject, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const swal = inject('$swal')

const form = reactive({
    data: {
        name: '',
        team_id: '',
    },
    errors: [],
    loading: false,
});

const createResource = () => {
    form.loading = true;
    form.errors = {};

    return axios.post('/api/projects', form.data)
        .then(() => {
            form.loading = false;
            location.href = '/admin/projects';
        })
        .catch(error => {
            form.loading = false;
        });
};

onMounted(() => {
    form.loading = true;
    axios.get(`/api/projects/${routeParams().project}`)
        .then(response => {
            form.data = response.data;
            form.loading = false;
        })
        .catch(() => {
            swal(t('Error!'), 'Failed to load project data.', 'error');
            form.loading = false;
        });
});

// Update team information
const updateResource = () => {
    form.errors = {};

    const data = {
        name: form.data.name,
        team_id: form.data.team_id === undefined ? null : form.data.team_id,
        company_id: form.data.company_id === undefined ? null : form.data.company_id,
    };

    return axios.put(`/api/projects/${routeParams().project}`, data)
        .then(() => {
            swal(t('Record updated!'), t('The project has been updated.'), 'success').then(() => {
                window.location.href = route('admin.projects');
            });
        })
        .catch(() => {
            swal(t('Error!'), t('An error occurred while updating the project.'), 'error');
        });
};

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

const loadTeam = (id, cachedOption) => {
    console.log({ id, cachedOption });

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

const searchCompanies = async ({ search, page, hasNextPage }) => {
    if (!search) {
        return []
    };

    const res = await axios.get(`/api/companies`, {
        params: {
            search
        }
    });
    
    if (res.data) {
        return res.data.data.map(company => ({
            value: company.id,
            label: company.name,
        }));
    }
    // If the request fails, we return an empty array.
    return []
};

const loadCompany = (id, cachedOption) => {
    console.log({ id, cachedOption });

    if (cachedOption) {
        return cachedOption;
    }

    if(form.data.company) {
        return {
            value: form.data.company.id,
            label: form.data.company.name,
        }
    }
}


</script>
<template>
    <Header>{{ $t('Create a project') }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/projects/${routeParams().project}`">
            <PrimaryButton>{{ $t('Show') }}</PrimaryButton>
        </Link>
        <DangerButton @click="destroyResource(routeParams().project)" class="hover:text-red-900">{{ $t('Delete') }}</DangerButton>
    </div>
    <PageContent>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required
                    id="name" :label="$t('Name')" placeholder="Parthenon" v-model="form.data.name" />

                <FormKit type="autocomplete" name="team" :label="$t('Team')" v-model="form.data.team_id" :placeholder="$t('Search for a team')"
                :options="searchTeams" :option-loader="loadTeam" popover selection-removable />

                <FormKit type="autocomplete" name="company" :label="$t('Company')" v-model="form.data.company_id" :placeholder="$t('Search for a company')"
                :options="searchCompanies" :option-loader="loadCompany" popover selection-removable />

                <!-- <FormKit validation-visibility="live" type="text" name="website" validation="length:2,200" required
                    id="website" :label="$t('Website')" placeholder="https://www.coca-cola.com"
                    v-model="form.data.website" /> -->
            </div>
            <FormKit validation-visibility="live" type="textarea" name="description" outer-class="min-w-[25%]"
                input-class="min-h-[150px] max-h-[350px]" validation="length:2,2000" required id="description"
                :label="$t('Description')" :placeholder="$t('A brief description of the project')"
                v-model="form.data.description" />
        </FormKit>
    </PageContent>
</template>
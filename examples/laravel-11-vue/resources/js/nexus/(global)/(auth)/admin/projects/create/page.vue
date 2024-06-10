<script setup>
import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';
import { reactive } from 'vue';

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
        return res.data.data.map(team => ({
            value: team.id,
            label: team.name,
        }));
    }
    // If the request fails, we return an empty array.
    return []
};

</script>
<template>
    <Header>{{ $t('Create a project') }}</Header>
    <PageContent>
        <FormKit :submit-label="$t('Save')" @submit="createResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required
                    id="name" :label="$t('Name')" placeholder="Parthenon" v-model="form.data.name" />

                <FormKit type="autocomplete" name="team" :label="$t('Team')" v-model="form.data.team_id"
                    :placeholder="$t('Search for a team')" :options="searchTeams" popover />

                <FormKit type="autocomplete" name="company" :label="$t('Company')" v-model="form.data.company_id"
                    :placeholder="$t('Search for a company')" :options="searchCompanies" popover />
            </div>

            <FormKit validation-visibility="live" type="textarea" name="description" outer-class="min-w-[25%]"
                input-class="min-h-[150px] max-h-[350px]" validation="length:2,2000" required id="description"
                :label="$t('Description')" :placeholder="$t('A brief description of the project')"
                v-model="form.data.description" />
        </FormKit>
    </PageContent>
</template>
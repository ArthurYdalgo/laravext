<script setup>
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import Loading from '@/components/Loading.vue';
import MomentDateTime from '@/components/MomentDateTime.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextArea from '@/components/TextArea.vue';
import { privacy } from '@/composables/usePrivacy';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const swal = inject('$swal')

const project = reactive({
    data: {
    },
    loading: true,
});

const form = reactive({
    data: {
        content: '',
    },
    errors: [],
    loading: false,
});

const createComment = () => {
    form.loading = true;
    form.errors = {};

    axios.post(`/api/projects/${routeParams().project}/comments`, form.data)
        .then((response) => {
            projectComments.data = [response.data.data, ...projectComments.data];
            form.loading = false;
        })
        .catch(error => {
            form.loading = false;
            form.errors = error.response.data.errors;
        });
};

const projectComments = reactive({
    data: [],
    meta: {},
    loading: true,
    page: 1,
    per_page: 5
});

const loadMore = () => {
    projectComments.page++;

    fetchComments();
};

const fetchComments = () => {
    projectComments.loading = true;

    axios.get(`/api/projects/${routeParams().project}/comments`, {
        params: {
            page: projectComments.page,
            per_page: projectComments.per_page,
        },
    })
        .then(response => {
            projectComments.data = [...projectComments.data, ...response.data.data];
            projectComments.meta = response.data.meta;
            projectComments.loading = false;
        })
        .catch(error => {
            console.error(error);
            projectComments.loading = false;
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
                        swal(t('Record deleted!'), t('The projects has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/projects';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the project.'), 'error');
                    });
            }
        });
}

onMounted(() => {
    project.loading = true;

    axios.get(`/api/projects/${routeParams().project}`)
        .then(response => {
            project.data = response.data;

            project.loading = false;

            fetchComments();
        });
});

</script>
<template>
    <Header>{{ project.loading ? $t('Loading...') : `#${project.data.id} - ${project.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/projects/${routeParams().project}/edit`">
        <PrimaryButton>{{ $t('Edit') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().project)" class="hover:text-red-900">{{ $t('Delete') }}
        </DangerButton>
    </div>
    <Loading v-if="project.loading" />
    <PageContent v-else>
        <span class="text-lg font-bold">{{ $t('Name') }}: </span>{{ project.data.name }}
        <br>
        <span class="text-lg font-bold">{{ $t('Team') }}: </span>
        <Link :class="{ 'cursor-poiter text-blue-600': project.data.team_id }"
            :href="`/admin/teams/${project.data.team_id}`">{{ project.data.team?.name ?? '--' }}</Link>
        <br>
        <span class="text-lg font-bold">{{ $t('Company') }}: </span>
        <Link :class="{ 'cursor-poiter text-blue-600': project.data.company_id }"
            :href="`/admin/companies/${project.data.company_id}`">{{ project.data.company?.name ?? '--' }}</Link>
        <br>
        <span class="text-lg font-bold">{{ $t('Description') }}: </span>
        <br>
        <p class="whitespace-pre-wrap">{{ project.data.description }}</p>
        <br>
        <span class="text-lg font-bold">{{ $t('Comments') }}: </span>
        <br>
        <div class="mt-3 mx-4 flex justify-end">
            <div>
                <TextArea v-model="form.data.content" :errors="form.errors.content" class="lg:w-[30rem] max-h-[300px]"
                    placeholder="Write a comment..." />
                <br>
                <div class="flex justify-end">
                    <PrimaryButton @click="createComment" :disabled="form.loading">{{ $t('Comment') }}</PrimaryButton>
                </div>
            </div>
        </div>
        <br>
        <div class="w-[50%]">
            <div v-for="comment in projectComments.data" :key="comment.id"
                class="bg-white shadow-md rounded-lg p-4 my-4">
                <div>
                    <div class="flex justify-between">
                        <Link :href="`/admin/users/${comment.user_id}`">{{ comment.user.name }}</Link>
                        <MomentDateTime :date="comment.created_at" />
                    </div>
                    <div class="border-b-2 border-gray-200 my-2"></div>
                    <p>{{ comment.content }}</p>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <PrimaryButton :disabled="projectComments.loading"
                v-if="projectComments.loading || (!projectComments.loading && projectComments.meta.current_page < projectComments.meta.last_page)"
                @click="loadMore">
                <div class="mini-loader w-[10px] mr-2" v-if="projectComments.loading"></div> {{
                    projectComments.loading ? $t('Loading') : $t('Load more') }}
            </PrimaryButton>
        </div>


    </PageContent>
</template>
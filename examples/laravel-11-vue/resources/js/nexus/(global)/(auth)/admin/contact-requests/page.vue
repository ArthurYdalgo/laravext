<script setup>
import { onMounted, reactive, ref, inject } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { debounce } from 'lodash-es';
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import PageContent from '@/components/PageContent.vue';
import Loading from '@/components/Loading.vue';
import { privacy } from '@/composables/usePrivacy';
import { useI18n } from 'vue-i18n';
import MomentDateTime from '@/components/MomentDateTime.vue';
import Fa from '@/components/Fa.vue';
import Tooltip from '@/components/Tooltip.vue';
import Modal from '@/components/Modal.vue';
import { FormKit } from '@formkit/vue';
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

const replyContactRequestModal = reactive({
    visible: false,
    data: {},
})

const replyContactRequest = () => {

    return axios.put(`/api/contact-requests/${replyContactRequestModal.data.id}/reply`, {
        reply: replyContactRequestModal.data.reply,
    })
        .then(() => {
            swal(t('Replied!'), t('The contact request has been replied.'), 'success').then(() => {
                fetchResources();
                replyContactRequestModal.visible = false;
                replyContactRequestModal.data = {};
            });
        })
        .catch(() => {
            swal(t('Error!'), t('An error occurred while replying to the contact request.'), 'error');
        });
};

const paginateTo = ({ page, perPage }) => {
    pagination.page = page;
    pagination.per_page = perPage;

    fetchResources();
};

const fetchResources = () => {
    pagination.loading = true;

    axios.get('/api/contact-requests', {
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
                axios.delete(`/api/contact-requests/${id}`)
                    .then(() => {
                        fetchResources();
                        swal(t('Record deleted!'), t('The contact request has been deleted.'), 'success');
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the contact request.'), 'error');
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
    <Header>{{ $t('Contact Requests') }}</Header>

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
                    Email
                </th>
                <th
                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('Subject') }}
                </th>
                <th
                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('Created At') }}
                </th>
                <th
                    class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('Replied At') }}
                </th>
                <th
                    class="border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('Actions') }}
                </th>
            </thead>
            <tbody>
                <tr class="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700"
                    v-for="resource in pagination.data" :key="resource.id">
                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28">
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
                        <div class="text-sm leading-5 text-gray-900">
                            {{ privacy.active ? '***@***' : resource.email }}
                        </div>
                    </td>
                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 text-gray-900">
                            {{ resource.subject }}
                        </div>
                    </td>
                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                        <div class="text-sm leading-5 text-gray-900">
                            <MomentDateTime :dateTime="resource.created_at" />
                        </div>
                    </td>

                    <td class="border-t border-l px-6 py-4 whitespace-no-wrap">
                        <Tooltip :condition="resource.replied_at"
                            :text="(resource.delivered_at ? t('Delivered') : t('On delivery queue')) + ` - ${$t('Replied by')}: ${resource.replier?.name}`">
                            <div class="flex text-sm leading-5"
                                :class="{ 'cursor-pointer': resource.replied_at, 'text-gray-900': !resource.replied_at, 'text-green-600': (resource.replied_at && resource.delivered_at), 'text-orange-600': (resource.replied_at && !resource.delivered_at) }">
                                <MomentDateTime :dateTime="resource.replied_at" />
                                <Fa :icon="resource.delivered_at ? 'check-circle' : 'clock'" v-if="resource.replied_at" class="ml-2 mt-1" />
                            </div>
                        </Tooltip>
                    </td>
                    <td
                        class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2">
                        <PrimaryButton
                            @click="replyContactRequestModal.visible = true; replyContactRequestModal.data = resource">
                            {{ resource.replied_at ? $t('Show') : $t('Reply') }}</PrimaryButton>
                        <DangerButton @click="destroyResource(resource.id)" class="hover:text-red-900">
                            {{ $t('Delete') }}</DangerButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagination v-if="!pagination.loading" @paginate-to="paginateTo" :pagination="pagination ?? {}" />
    </PageContent>
    <Modal :show="replyContactRequestModal.visible" :closeable="true" @close="replyContactRequestModal.visible = false; replyContactRequestModal.data = {}"
        maxWidth="w-[500px]">
        <div class="p-6 flex flex-col justify-center">
            <h2 class="text-xl font-bold mb-2">{{ replyContactRequestModal.data.replied_at ? $t("Contact request's response") : $t('Reply to contact request') }}</h2>
            <FormKit :actions="false" @submit="replyContactRequest" type="form">
                <div class="flex flex-col items-center">
                    <FormKit validation-visibility="live" type="text" name="name" required id="name" :label="$t('Name')"
                        placeholder="Your beautiful name here" v-model="replyContactRequestModal.data.name"
                        outer-class="w-full max-w-[500px]" disabled />

                    <FormKit validation-visibility="live" type="email" name="email" required id="email"
                        :label="$t('Email')" placeholder="Your email here" v-model="replyContactRequestModal.data.email"
                        outer-class="w-full max-w-[500px]" disabled />

                    <FormKit validation-visibility="live" type="text" name="subject" required id="subject"
                        outer-class="w-full max-w-[500px]" :label="$t('Subject')" placeholder="Your subject here"
                        v-model="replyContactRequestModal.data.subject" disabled />

                    <FormKit validation-visibility="live" type="textarea" name="message" required id="message"
                        :label="$t('Message')" input-class="max-h-[300px] min-h-[100px]"
                        outer-class="w-full max-w-[500px]" placeholder="Your message here"
                        v-model="replyContactRequestModal.data.message" disabled />

                    <FormKit validation-visibility="live" type="textarea" name="reply" validation="length:2,5000"
                        required id="reply" :label="$t('Response')" input-class="max-h-[300px] min-h-[100px]"
                        outer-class="w-full max-w-[500px]" :placeholder="$t('Your response here')"
                        v-model="replyContactRequestModal.data.reply" :disabled="replyContactRequestModal.data.replied_at" />


                    <FormKit type="submit" v-if="!replyContactRequestModal.data.replied_at" class="mt-6">{{ $t('Save') }}</FormKit>
                </div>
            </FormKit>
        </div>
    </Modal>
</template>
<style scoped></style>
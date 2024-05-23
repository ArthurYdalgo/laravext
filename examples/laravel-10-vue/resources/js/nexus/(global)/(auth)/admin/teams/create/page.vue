<script setup>
import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';

</script>
<template>
    <Header>Create a team</Header>
    <PageContent>
        <FormKit type="form">
            <FormKit validation-visibility="live" type="text" name="name" validation="length:10,200" id="name" :label="$t('Name')" :placeholder="`“${$t('Jon Doe')}”`" />

        </FormKit>
    </PageContent>
</template>
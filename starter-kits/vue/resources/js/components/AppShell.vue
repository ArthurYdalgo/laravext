<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import { onMounted, ref, inject } from 'vue';
import Cookies from 'js-cookie';
const sharedProps = inject("$sharedProps") as any;

interface Props {
    variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const isOpen = ref(sharedProps().sidebar === 'true');

onMounted(() => {
    isOpen.value = sharedProps().sidebar === 'true';
});

const handleSidebarChange = (open: boolean) => {
    isOpen.value = open;
    Cookies.set('sidebar', String(open));
};
</script>

<template>
    <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
    <SidebarProvider v-else :default-open="isOpen" :open="isOpen" @update:open="handleSidebarChange">
        <slot />
    </SidebarProvider>
</template>

import { SidebarProvider } from '@/components/ui/sidebar';
import { laravext } from '@laravext/react';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const {sidebar_is_open} = laravext().app;
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? (Cookies.get('sidebar') ?? 'true') === 'true' : sidebar_is_open));

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);

        if (typeof window !== 'undefined') {
            Cookies.set('sidebar', String(open));
        }
    };

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
            {children}
        </SidebarProvider>
    );
}

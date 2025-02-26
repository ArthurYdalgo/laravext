import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head, nexusProps, sharedProps } from '@laravext/react';
import { useForm } from '@/hooks/useForm';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile() {
    const { auth } = sharedProps();
    const { mustVerifyEmail } = nexusProps();

    const { data, setData, errors, setErrors, processing, setProcessing, recentlySuccessful, setRecentlySuccessful, clearErrors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const [status, setStatus] = useState(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setRecentlySuccessful(false);
        clearErrors();

        axios.patch('/api/settings/profile', data).then(() => {
            setRecentlySuccessful(true);
        }).catch((error) => {
            setErrors(error.response.data.errors);
        }).finally(() => {
            setProcessing(false);
        });
    };

    const sendVerificationEmail = () => {
        axios.post('/api/email/verification-notification').then(({data}) => {
            setStatus(data.status);
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">
                                    Your email address is unverified.
                                    {" "}<button
                                        onClick={sendVerificationEmail}
                                        type='button'
                                        className="rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-300"
                                    >
                                        Click here to re-send the verification email.
                                    </button>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                                {status === 'email-already-verified' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Your email address is already verified.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}

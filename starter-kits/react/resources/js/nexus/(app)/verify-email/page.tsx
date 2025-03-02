// Components
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Head, nexusProps, visit } from '@laravext/react';
import axios from 'axios';
import { useForm } from '@/hooks/useForm';

export default function VerifyEmail() {
    const [status, setStatus] = useState(nexusProps().status);
    const { processing, setProcessing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios.post('/api/email/verification-notification').then((response) => {
            setStatus(response.data.status);
        }).finally(() => {
            setProcessing(false);
        });
    };

    const logout = () => {
        axios.post('/api/logout').then(() => {
            visit(route('home'));
        });
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink onClick={logout} className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}

// Components
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@laravext/react';
import { useForm } from '@/hooks/use-form';
import axios from 'axios';

export default function ForgotPassword() {
    const { data, setData, reset, processing, setProcessing, errors, setErrors, clearErrors } = useForm({
        email: '',
    });

    const [status, setStatus] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        setProcessing(true);

        axios.post('/api/forgot-password', data).then((response) => {
            reset();
            clearErrors();

            setStatus(response.data.status);
        }).catch((error) => {
            setErrors(error.response.data.errors);
        }).finally(() => {
            setProcessing(false);
        });
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink href={route('login')}>log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}

import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, Link, visit } from '@laravext/react';
import axios from 'axios';
import { useState } from 'react';

export default () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/login', {
            email: data.email,
            password: data.password,
            remember: data.remember,
        }).then(() => {
            visit('/dashboard');
        }).catch((error) => {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
            }
        }); 
    };

    return (
        <>
            <Head title="Log in" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData((prev) => ({ ...prev, remember: e.target.checked }))}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4 space-x-3">
                    
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Need an account?
                    </Link>

                    <Link
                        href={route('forgot-password')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Forgot your password?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

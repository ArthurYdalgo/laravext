import React, { useState } from 'react';
import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import Link from '@/components/Link';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';


export default () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
        response: null,
        processing: false,
    });

    

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setForm(prevForm => ({ ...prevForm, processing: true }));

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    remember: form.remember,
                }),
            });

            if (response.ok) {
                window.location.href = route('admin.dashboard');
            } else {
                const responseData = await response.json();
                setForm(prevForm => ({
                    ...prevForm,
                    response: responseData,
                    processing: false
                }));
            }
        } catch (error) {
            console.error('Login Error:', error);
            setForm(prevForm => ({ ...prevForm, processing: false }));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] mt-6">
            <form onSubmit={submit} className="w-96">
                <h3 className="mt-6 justify-center text-2xl font-extrabold text-gray-900 dark:text-white text-center">Login</h3>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" name="email" type="email" className="mt-1 block w-full" value={form.email} onChange={handleInputChange} required autoFocus autoComplete="username" />
                    <InputError className="mt-2" message={form.response?.errors?.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" name="password" type="password" className="mt-1 block w-full" value={form.password} onChange={handleInputChange} required autoComplete="current-password" />
                    <InputError className="mt-2" message={form.response?.errors?.password} />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" checked={form.remember} onChange={handleInputChange} />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={form.processing} style={{ opacity: form.processing ? 0.25 : 1 }}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};
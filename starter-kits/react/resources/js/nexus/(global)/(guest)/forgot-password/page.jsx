import { useState } from 'react';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, Link } from '@laravext/react';

export default ({ }) => {
    const [data, setData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('');

    const submit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/forgot-password', {
            email: data.email,
        }).then(({data}) => {
            setProcessing(false);
            setErrors({
                email: '',
            });

            setStatus(data.status);
        }).catch((error) => {
            if(error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            setProcessing(false);
        });
        
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

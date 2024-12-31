import { FormEvent, useState } from 'react';
import InputError from '@/components/InputError';
import axios from 'axios';
import PrimaryButton from '@/components/PrimaryButton';

export default ({ className = '' }) => {
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        setProcessing(true);

        axios.post('/api/auth/email/verification-notification').then(({data}) => {
            setProcessing(false);
            setStatus(data.status);
        }).catch((error) => {
            setProcessing(false);
            console.error(error);
            setError(error.response.data?.message ?? 'An error occurred.');
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Verify E-mail</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Please verify your email address by clicking the button below.
                </p>
            </header>

            <PrimaryButton disabled={processing} onClick={submit}>Verify Email</PrimaryButton>
            
            {status && <div className="font-medium text-sm text-green-600">{status}</div>}
            <InputError message={error} />
           
        </section>
    );
}

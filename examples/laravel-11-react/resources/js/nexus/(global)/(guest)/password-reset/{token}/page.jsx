import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, queryParams, routeParams, visit } from '@laravext/react';
import axios from 'axios';
import {useState} from 'react';

export default ({ }) => {

    const { token } = routeParams();
    const { email } = queryParams();

    const [ data, setData ] = useState({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [ processing, setProcessing ] = useState(false);

    const [ errors, setErrors ] = useState({})

    const submit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/reset-password', data)
        .then(({ data }) => {
            visit(route('login'));
        }).catch((error) => {
            if(error.response.status === 422) {
                setErrors(error.response.data.errors);
            }

            setProcessing(false);
        });
    };

    return (
        <div className='w-full max-w-md mx-auto'>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        readOnly={true}
                        className="mt-1 block w-full"
                        autoComplete="username"
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
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData((prev) => ({ ...prev, password_confirmation: e.target.value }))}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

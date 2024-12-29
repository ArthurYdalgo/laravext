import DeleteUserForm from './partials/DeleteUserForm';
import UpdatePasswordForm from './partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm';
import { Head, sharedProps } from '@laravext/react';
import Header from '@/components/Header';
import VerifyEmailForm from './partials/VerifyEmailForm';

export default () => {

    const { user } = sharedProps().auth;

    return (
        <>
            <Head title="Profile" />
            <Header>Profile</Header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {user.email_verified_at == null && 
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <VerifyEmailForm className="max-w-xl" />
                    </div>}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

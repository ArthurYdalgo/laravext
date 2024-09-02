import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Link, sharedProps } from "@laravext/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

export default ({ className = "" }) => {
    const { user } = sharedProps().auth;

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);


    const submit = (e) => {
        e.preventDefault();

        setProcessing(true);
        axios.put("/api/auth/user", data).then(() => {
            setRecentlySuccessful(true);
            setProcessing(false);
        }).catch((error) => {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
            }
            setProcessing(false);
        });
        

    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

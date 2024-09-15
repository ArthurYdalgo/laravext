import DangerButton from "@/components/DangerButton";
import Fa from "@/components/Fa";
import InputLabel from "@/components/InputLabel";
import Link from "@/components/Link";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { sharedProps } from "@laravext/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import DeleteUserForm from "./partials/DeleteUserForm";
import VerifyEmailForm from "./partials/VerifyEmailForm";

export default () => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    return (
        <>
            <h2 className="font-semibold text-blue-700">
                <Link
                    className="hover:underline"
                    href={route("user", { user: user?.username })}
                >
                    @{user?.username}
                </Link>
            </h2>
            <div className="flex flex-col space-y-4">
                {user.email_verified_at == null ? (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <VerifyEmailForm className="max-w-xl" />
                    </div>
                ) : (
                    <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col">
                        <section className={`space-y-6`}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    {t("Your email has been verified")}
                                </h2>
                            </header>
                        </section>
                    </div>
                )}
                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col">
                    <UpdatePasswordForm />
                </div>
                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col">
                    <DeleteUserForm />
                </div>
            </div>
        </>
    );
};

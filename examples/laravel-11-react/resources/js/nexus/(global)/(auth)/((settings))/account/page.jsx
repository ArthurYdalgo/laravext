import DangerButton from "@/components/DangerButton";
import Fa from "@/components/Fa";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { sharedProps } from "@laravext/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default () => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    const fileFromUrl = async (url, name) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
            type: data.type || defaultType,
        });
    };

    // grab binary data from the user avatar_url, if it exists
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user?.avatar_url) {
            fileFromUrl(user?.avatar_url, "avatar").then((file) => {
                setAvatar(file);
            });
        }
    }, []);

    const submit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        console.log(avatar);

        if (avatar) {
            formData.append("avatar", avatar);
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="font-semibold text-blue-700">
                        @{user?.username}
                    </h2>
                    <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                        <h3 className="font-bold mb-2">User</h3>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Name")}
                            </InputLabel>
                            <TextInput
                                name="name"
                                initialValue={user?.name}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Username")}
                            </InputLabel>
                            <TextInput
                                name="username"
                                initialValue={user?.username}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Email")}
                            </InputLabel>
                            <TextInput
                                name="email"
                                initialValue={user?.email}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Profile Image")}
                            </InputLabel>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={
                                            avatar
                                                ? URL.createObjectURL(avatar)
                                                : user?.avatar_url ??
                                                  "/images/avatars/placeholder.png"
                                        }
                                        alt="avatar"
                                        className="min-w-12 w-12 rounded-full"
                                    />
                                </div>
                                <div className="border p-1 ml-2 rounded-md w-full border-gray-200 flex justify-between">
                                    <div className="flex space-x-2">
                                        <PrimaryButton
                                            as="label"
                                            htmlFor="avatar"
                                            type="button"
                                            className="cursor-pointer h-8"
                                            onClick={() => {
                                                // simulate click on the file input
                                                document
                                                    .getElementById("avatar")
                                                    .click();
                                            }}
                                        >
                                            {t("Change")}
                                        </PrimaryButton>
                                        <input
                                            type="file"
                                            id="avatar"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                setAvatar(e.target.files[0]);
                                            }}
                                        />
                                    </div>

                                    {avatar && (
                                        <DangerButton
                                            type="button"
                                            onClick={() => {
                                                setAvatar(null);
                                                document.getElementById(
                                                    "avatar"
                                                ).value = "";
                                            }}
                                        >
                                            <Fa icon="trash" />
                                        </DangerButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div className="bg-white px-4 py-4 rounded-md shadow sticky bottom-0">
                    <PrimaryButton
                        type="submit"
                        className="w-full flex justify-center"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
};

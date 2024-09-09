import DangerButton from "@/components/DangerButton";
import Fa from "@/components/Fa";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { sharedProps } from "@laravext/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";
import Swal from "sweetalert2";
import axios from "axios";
import TextAreaInput from "@/components/TextAreaInput";
import Link from "@/components/Link";

export default () => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    const [banner, setBanner] = useState({
        displayColorPicker: false,
        color: user?.banner_hex_color ?? "#000000",
    });

    const handleChange = (color) => {
        setBanner((prevState) => ({
            ...prevState,
            color: color,
        }));
    };

    const handleClick = () => {
        setBanner((prevState) => ({
            ...prevState,
            displayColorPicker: !prevState.displayColorPicker,
        }));
    };

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
        
        formData.append("banner_hex_color", banner.color);
        
        formData.append("avatar", avatar ?? '');

        axios
            .post("/api/auth/user", formData)
            .then(() => {
                setBanner((prevState) => ({
                    ...prevState,
                    displayColorPicker: false,
                }));

                Swal.fire({
                    title: t("Profile saved successfully"),
                    icon: "success",
                    confirmButtonText: t("OK"),
                });

            })
            .catch(() => {
                Swal.fire({
                    title: t(
                        "An error occurred while trying to save your profile"
                    ),
                    icon: "error",
                    confirmButtonText: t("OK"),
                });
            });
    };

    const destroyAvatar = () => {
        axios
            .delete("/api/auth/user/avatar")
            .then(() => {
                setAvatar(null);
            })
            .catch(() => {
                Swal.fire({
                    title: t(
                        "An error occurred while trying to delete your avatar"
                    ),
                    icon: "error",
                    confirmButtonText: t("OK"),
                });
            });
    }

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="font-semibold text-blue-700">
                        <Link className="hover:underline" href={route('user', {user: user?.username})}>@{user?.username}</Link>
                    </h2>
                    <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                        <h3 className="font-bold mb-2">User</h3>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Name")}
                            </InputLabel>
                            <TextInput
                                name="name"
                                maxLength={255}
                                initialValue={user?.name}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Username")}
                            </InputLabel>
                            <TextInput
                                name="username"
                                maxLength={20}
                                initialValue={user?.username}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <InputLabel fontSizeClass="text-lg">
                                {t("Email")}
                            </InputLabel>
                            <TextInput
                                name="email"
                                maxLength={200}
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
                                                : "/images/avatars/placeholder.png"
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
                                                setAvatar(e.target.files[0]);
                                            }}
                                        />
                                    </div>

                                    {avatar && (
                                        <DangerButton
                                            type="button"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: t("Are you sure?"),
                                                    text: t(
                                                        "This action cannot be undone"
                                                    ),
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonText: t(
                                                        "Yes, delete it"
                                                    ),
                                                    cancelButtonText: t("Cancel"),
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        destroyAvatar();
                                                        setAvatar(null);
                                                        document.getElementById(
                                                            "avatar"
                                                        ).value = "";
                                                    }
                                                });
                                                
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

                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                    <h3 className="font-bold mb-2">Basic</h3>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Biography")}
                        </InputLabel>
                        <TextAreaInput
                            name="biography"
                            maxLength={2000}
                            initialValue={user?.biography}
                            className="max-h-60"
                        ></TextAreaInput>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Location")}
                        </InputLabel>
                        <TextInput
                            maxLength={255}
                            name="location"
                            initialValue={user?.location}
                        ></TextInput>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Education")}
                        </InputLabel>
                        <TextInput
                            maxLength={255}
                            name="education"
                            initialValue={user?.education}
                        ></TextInput>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Work")}
                        </InputLabel>
                        <TextInput
                            maxLength={255}
                            name="work"
                            initialValue={user?.work}
                        ></TextInput>
                    </div>
                </div>

                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                    <h3 className="font-bold mb-2">Personal</h3>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Pronouns")}
                        </InputLabel>
                        <TextInput
                            maxLength={20}
                            name="pronouns"
                            initialValue={user?.pronouns}
                        ></TextInput>
                    </div>
                </div>

                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                    <h3 className="font-bold mb-2">Customization</h3>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Your Color")}
                        </InputLabel>
                        <div onClick={handleClick} className="flex">
                            <div
                                className="w-10 h-6 rounded-md cursor-pointer"
                                style={{
                                    backgroundColor: banner.color
                                }}
                            ></div>
                            {banner.displayColorPicker && (
                                <div className="ml-1 text-gray-600">(Click again to close)</div>
                            )}
                        </div>

                        {banner.displayColorPicker && (
                            <HexColorPicker color={banner.color} onChange={handleChange} />
                        )}
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

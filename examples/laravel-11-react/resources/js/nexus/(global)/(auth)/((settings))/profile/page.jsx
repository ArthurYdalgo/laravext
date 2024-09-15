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
import Tooltip from "@/components/Tooltip";
import Dropdown from "@/components/Dropdown";
import DropdownButton from "@/components/DropdownButton";
import SecondaryButton from "@/components/SecondaryButton";
import InputError from "@/components/InputError";

export default () => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    const [banner, setBanner] = useState({
        displayColorPicker: false,
        color: user?.banner_hex_color ?? "#000000",
    });

    const [errors, setErrors] = useState({});

    const icons = [
        "linkedin",
        "github",
        "discord",
        "twitter",
        "facebook",
        "x-twitter",
        "youtube",
    ];

    const [newLink, setNewLink] = useState({
        type: "icon",
        icon: "github",
        url: "",
    });

    const [links, setLinks] = useState(
        user?.links ?? [
            {
                type: "icon",
                icon: "github",
                url: "https://github.com/ArthurYdalgo",
            },
            {
                type: "icon",
                icon: "linkedin",
                url: "https://www.linkedin.com/in/arthur-ydalgo-7b4b3b1b9/",
            }
        ]
    );

    const removeLink = (index) => {
        setLinks((prevState) => {
            let newState = [...prevState];
            newState.splice(index, 1);
            return newState;
        });
    };

    const updateLink = (index, key, value) => {
        setLinks((prevState) => {
            let newState = [...prevState];
            newState[index][key] = value;
            return newState;
        });
    };

    const moveLink = (index, direction) => {
        let currentLinks = [...links];

        let newIndex = index + direction;
        if (newIndex < 0 || newIndex >= currentLinks.length) {
            return;
        }

        let link = {...currentLinks[index]};
        currentLinks[index] = {...currentLinks[newIndex]};
        currentLinks[newIndex] = link;

        setLinks(currentLinks);
    };

    const addLink = () => {
        let newLinks = [...links, {...newLink}];
        
        setLinks(newLinks);

        setNewLink({
            type: "icon",
            icon: "github",
            url: "",
        });
    };

    const handleBannerChange = (color) => {
        setBanner((prevState) => ({
            ...prevState,
            color: color,
        }));
    };

    const handlBannerClick = () => {
        setBanner((prevState) => ({
            ...prevState,
            displayColorPicker: !prevState.displayColorPicker,
        }));
    };

    const handleAvatarChange = (e) => {
        let file = e.target.files[0];
        setAvatar(file);

        let formData = new FormData();
        formData.append("image", file);

        axios
            .post("/api/tools/image-average-color", formData)
            .then((response) => {
                let color = response.data.data.color;
                Swal.fire({
                    title: t("Color detected"),
                    html: `
                <div class="w-full flex justify-center">
                <span class="">${t(
                    "Do you to use the average color of your profile picture as the banner color?"
                )}</span>
                </div>
                <div class="w-full flex justify-center">
                <div class="w-10 h-6 rounded-md" style="background-color: ${color}"></div>
                </div>
                <div class="w-full flex justify-center">
                <span class="font-semibold">${color}</span>
                </div>
                `,
                    text: t("Do you want to use this color as your banner?"),
                    showCancelButton: true,
                    confirmButtonText: t("Yes"),
                    cancelButtonText: t("No"),
                }).then((result) => {
                    if (result.isConfirmed) {
                        setBanner((prevState) => ({
                            ...prevState,
                            color,
                        }));
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
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

        formData.append("avatar", avatar ?? "");

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
            .catch((error) => {
                setErrors((prevState) => ({
                    ...prevState,
                    ...error.response.data.errors,
                }));
                
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
    };

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="font-semibold text-blue-700">
                        <Link
                            className="hover:underline"
                            href={route("user", { user: user?.username })}
                        >
                            @{user?.username}
                        </Link>
                    </h2>
                    <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                        <h3 className="font-bold mb-2">{t('User')}</h3>
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
                            <InputError message={errors.username} />
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
                            <InputError message={errors.email} />
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
                                        className="min-w-12 w-12 max-w-12 min-h-12 h-12 max-h-12 rounded-full"
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
                                            onChange={handleAvatarChange}
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
                                                    confirmButtonText:
                                                        t("Yes, delete it"),
                                                    cancelButtonText:
                                                        t("Cancel"),
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
                    <h3 className="font-bold mb-2">{t('Basic Information')}</h3>
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
                    <h3 className="font-bold mb-2">{t('Personal')}</h3>
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
                    <h3 className="font-bold mb-2">Links</h3>
                    <div className="flex flex-col space-y-2">
                        {links.map((link, index) => (
                            <div key={`listed-link-${index}`}>
                                <input
                                    type="hidden"
                                    name={`links[${index}][type]`}
                                    value={link.type}
                                />
                                <input
                                    type="hidden"
                                    name={`links[${index}][icon]`}
                                    value={link.icon}
                                />
                                <input
                                    type="hidden"
                                    name={`links[${index}][url]`}
                                    value={link.url}
                                />
                                <div
                                    key={index}
                                    className="flex space-x-2 items-center"
                                >
                                    <div className="flex flex-col">
                                        <button type="button" disabled={index == 0} onClick={() => moveLink(index, -1)}>
                                            <Fa icon="arrow-up" size="xs" />
                                        </button>
                                        <button type="button" disabled={index == links.length - 1}
                                        
                                        onClick={() => moveLink(index, 1)}>
                                            <Fa icon="arrow-down" size="xs" />
                                        </button>
                                    </div>
                                    {link.type == "short_link" && (
                                        <div className="flex items-center">
                                            <Tooltip
                                                text={t(
                                                    "Click to change to icon"
                                                )}
                                            >
                                                <PrimaryButton
                                                    type="button"
                                                    className="w-20 flex justify-center "
                                                    onClick={() =>
                                                        updateLink(
                                                            index,
                                                            "type",
                                                            "icon"
                                                        )
                                                    }
                                                >
                                                    {t("Link")}
                                                </PrimaryButton>
                                            </Tooltip>
                                        </div>
                                    )}
                                    {link.type == "icon" && (
                                        <div className="flex items-center">
                                            <Tooltip
                                                text={t(
                                                    "Click to change to short link"
                                                )}
                                            >
                                                <PrimaryButton
                                                    type="button"
                                                    className="w-20 flex justify-center "
                                                    onClick={() =>
                                                        updateLink(
                                                            index,
                                                            "type",
                                                            "short_link"
                                                        )
                                                    }
                                                >
                                                    {t("Icon")}
                                                </PrimaryButton>
                                            </Tooltip>
                                        </div>
                                    )}

                                    <div className="flex flex-col space-y-2 w-full">
                                        <div className="flex items-center space-x-2">
                                            <TextInput
                                                maxLength={255}
                                                value={link.url}
                                                onChange={(e) => {
                                                    let link = e.target.value;

                                                    // remove https://wwww. or http://www or https:// or http:// from the link
                                                    link = link.replace(
                                                        /(^\w+:|^)\/\//,
                                                        ""
                                                    );

                                                    updateLink(
                                                        index,
                                                        "url",
                                                        e.target.value
                                                    );
                                                }}
                                            ></TextInput>
                                            {link.type == "icon" && (
                                        <div className="flex items-center">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <SecondaryButton type="button">
                                                        <Fa
                                                            icon={`fa-brands fa-${link.icon}`}
                                                            size="xl"
                                                            className="w-6"
                                                        />
                                                    </SecondaryButton>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content align="right">
                                                    {icons.map((icon) => (
                                                        <DropdownButton
                                                            key={`listed-link-${index}-${icon}`}
                                                            type="button"
                                                            onClick={() =>
                                                                updateLink(
                                                                    index,
                                                                    "icon",
                                                                    icon
                                                                )
                                                            }
                                                            className={
                                                                icon ==
                                                                link.icon
                                                                    ? "bg-blue-200"
                                                                    : ""
                                                            }
                                                        >
                                                            <Fa
                                                                icon={`fa-brands fa-${icon}`}
                                                                size="lg"
                                                                className="mr-2"
                                                            />
                                                            {icon}
                                                        </DropdownButton>
                                                    ))}
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    )}
                                        </div>
                                        
                                    </div>

                                    <DangerButton
                                        type="button"
                                        onClick={() => removeLink(index)}
                                    >
                                        <Fa icon="trash" />
                                    </DangerButton>
                                </div>
                            </div>
                        ))}
                        <div className="flex space-x-2 items-center">
                            {newLink.type == "short_link" && (
                                <div className="flex items-center">
                                    <Tooltip
                                        text={t("Click to change to icon")}
                                    >
                                        <PrimaryButton
                                            type="button"
                                            className="w-20 flex justify-center "
                                            onClick={() =>
                                                setNewLink((prevState) => ({
                                                    ...prevState,
                                                    type: "icon",
                                                }))
                                            }
                                        >
                                            {t("Link")}
                                        </PrimaryButton>
                                    </Tooltip>
                                </div>
                            )}
                            {newLink.type == "icon" && (
                                <div className="flex items-center">
                                    <Tooltip
                                        text={t(
                                            "Click to change to short link"
                                        )}
                                    >
                                        <PrimaryButton
                                            type="button"
                                            className="w-20 flex justify-center"
                                            onClick={() =>
                                                setNewLink((prevState) => ({
                                                    ...prevState,
                                                    type: "short_link",
                                                }))
                                            }
                                        >
                                            {t("Icon")}
                                        </PrimaryButton>
                                    </Tooltip>
                                </div>
                            )}
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="flex items-center space-x-2">
                                    <TextInput
                                        maxLength={255}
                                        value={newLink.url}
                                        onChange={(e) => {
                                            let link = e.target.value;
                                            
                                            setNewLink((prevState) => ({
                                                ...prevState,
                                                url: link,
                                            }));
                                        }}
                                    ></TextInput>
                                    {newLink.type == "icon" && (
                                        <div className="flex items-center">
                                           
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <SecondaryButton type="button">
                                                        <Fa
                                                            icon={`fa-brands fa-${newLink.icon}`}
                                                            size="xl"
                                                            className="w-6"
                                                        />
                                                    </SecondaryButton>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content align="right">
                                                    {icons.map((icon) => (
                                                        <DropdownButton
                                                            key={icon}
                                                            type="button"
                                                            onClick={() =>
                                                                setNewLink(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        icon,
                                                                    })
                                                                )
                                                            }
                                                            className={
                                                                icon ==
                                                                newLink.icon
                                                                    ? "bg-blue-200"
                                                                    : ""
                                                            }
                                                        >
                                                            <Fa
                                                                icon={`fa-brands fa-${icon}`}
                                                                size="lg"
                                                                className="mr-2"
                                                            />
                                                            {icon}
                                                        </DropdownButton>
                                                    ))}
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <PrimaryButton type="button" onClick={addLink}>
                                <Fa icon="plus" />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-7 py-8 rounded-md shadow flex flex-col space-y-2">
                    <h3 className="font-bold mb-2">{t('Customization')}</h3>
                    <div className="flex flex-col space-y-2">
                        <InputLabel fontSizeClass="text-lg">
                            {t("Your Color")}
                        </InputLabel>
                        <div onClick={handlBannerClick} className="flex">
                            <div
                                className="w-10 h-6 rounded-md cursor-pointer"
                                style={{
                                    backgroundColor: banner.color,
                                }}
                            ></div>
                            {banner.displayColorPicker && (
                                <div className="ml-1 text-gray-600">
                                    ({t('Click again to close')})
                                </div>
                            )}
                        </div>

                        {banner.displayColorPicker && (
                            <HexColorPicker
                                color={banner.color}
                                onChange={handleBannerChange}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white px-4 py-4 rounded-md shadow sticky bottom-0">
                    <PrimaryButton
                        type="submit"
                        className="w-full flex justify-center"
                    >
                        {t('Save')}
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
};

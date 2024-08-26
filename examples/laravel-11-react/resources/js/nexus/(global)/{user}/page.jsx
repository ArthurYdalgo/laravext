import ArticleListing from "@/components/Article/ArticleListing";
import Dropdown from "@/components/Dropdown";
import DropdownButton from "@/components/DropdownButton";
import Fa from "@/components/Fa";
import FollowButton from "@/components/FollowButton";
import FormSaveButton from "@/components/FormSaveButton";
import ThreeDots from "@/components/Icons/ThreeDots";
import Modal from "@/components/Modal";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileLink from "@/components/ProfileLink";
import SecondaryButton from "@/components/SecondaryButton";
import { sharedProps, nexusProps } from "@laravext/react";
import { visit } from "@laravext/react";
import moment from "moment/min/moment-with-locales";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default () => {
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;

    const { available_abuse_report_types } = sharedProps();

    const [abuseReportModal, setAbuseReportModal] = useState({
        show: false,
        submitting: false,
        message: "",
        type: "",
    });

    const submitAbuseReport = () => {
        setAbuseReportModal((prevState) => ({
            ...prevState,
            submitting: true,
        }));
        axios
            .post(`/api/users/${pageUser.id}/abuse-reports`, {
                message: abuseReportModal.message,
                type: abuseReportModal.type,
            })
            .then((response) => {
                setAbuseReportModal((prevState) => ({
                    ...prevState,
                    show: false,
                    submitting: false,
                    message: "",
                    type: "",
                }));
                Swal.fire({
                    title: t("User reported successfully"),
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error(error);
                setAbuseReportModal((prevState) => ({
                    ...prevState,
                    submitting: false,
                }));
                let message = error.response?.data?.message ?? null;
                Swal.fire({
                    title: t("Failed to report user"),
                    text: message,
                    icon: "error",
                });
            });
    };

    const { user: pageUser } = nexusProps();

    if (!pageUser) {
        return null;
    }

    return (
        <>
            {/* color area under top frame */}
            <div className="bg-white rounded-md mt-2 shadow-md">
                {/* user profile */}
                <div
                    className={"flex items-center justify-center rounded-t-md"}
                    style={{
                        backgroundColor:
                            pageUser?.banner_hex_color ?? "#000000",
                    }}
                >
                    <div className="p-4 py-6">
                        <img
                            className="h-32 w-32 shadow-lg rounded-full border-gray-200 border-2"
                            src={
                                pageUser?.avatar_url ??
                                "/images/avatars/placeholder.png"
                            }
                            alt={pageUser?.name}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center p-1">
                    <div className="flex flex-col items-center space-y-3 w-full">
                        <span className="font-bold text-3xl">
                            {pageUser?.name}{" "}
                            {pageUser?.pronouns ? (
                                <span className="text-gray-500 text-xs">
                                    ({pageUser?.pronouns})
                                </span>
                            ) : (
                                ""
                            )}
                        </span>
                        <div className="flex">
                            <FollowButton
                                disabled={user && pageUser?.id == user?.id}
                                followee={pageUser}
                            />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        disabled={pageUser?.id == user?.id}
                                        className={
                                            "ml-1 transition inline-flex items-center px-4 py-2 hover:bg-gray-100 rounded-md " +
                                            (pageUser?.id == user?.id
                                                ? "cursor-not-allowed"
                                                : "")
                                        }
                                    >
                                        <ThreeDots />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right">
                                    <DropdownButton
                                        onClick={() => {
                                            if (!user) {
                                                Swal.fire({
                                                    title: t(
                                                        "You must be logged in to report this user"
                                                    ),
                                                    icon: "info",
                                                    showCancelButton: true,
                                                    confirmButtonText:
                                                        t("Login"),
                                                    cancelButtonText:
                                                        t("Cancel"),
                                                }).then(({ isConfirmed }) => {
                                                    if (isConfirmed) {
                                                        visit(route("login"));
                                                    }
                                                });
                                                return;
                                            }
                                            setAbuseReportModal(
                                                (prevState) => ({
                                                    ...prevState,
                                                    show: true,
                                                })
                                            );
                                        }}
                                    >
                                        <span className="">
                                            {t("Report Abuse")}
                                        </span>
                                    </DropdownButton>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="text-center text-base mt-2 px-6">
                            {pageUser.biography}
                        </div>
                        {/* <div className="border-b border-gray-200 w-full"></div> */}

                        {/* maximum of 4 per line. no line break */}
                        <div className="flex flex-wrap justify-center space-x-4 px-24 pt-4 pb-3">
                            <span>
                                <Fa icon="birthday-cake" className="mr-1" />
                                {t("Joined on")}{" "}
                                {moment(pageUser.created_at)
                                    .locale(i18n.language)
                                    .format("LL")}
                            </span>
                            {pageUser.location && (
                                <span>
                                    <Fa icon="location-dot" className="mr-1" />
                                    {pageUser.location}
                                </span>
                            )}
                            {pageUser.work && (
                                <span>
                                    <Fa icon="suitcase" className="mr-1" />
                                    {pageUser.work}
                                </span>
                            )}
                            {pageUser.education && (
                                <span>
                                    <Fa
                                        icon="graduation-cap"
                                        className="mr-1"
                                    />
                                    {pageUser.education}
                                </span>
                            )}
                        </div>
                        <div className="border-b border-gray-200 w-full"></div>
                        <div className="flex flex-wrap justify-center space-x-4 px-24 pt-4 pb-3">
                            {pageUser.links?.map((link, index) => {
                                return (
                                    <ProfileLink
                                        key={`link-${index}`}
                                        link={link}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-3 space-x-3">
                <div className="hidden sm:block sm:w-4/12 lg:w-4/12 space-y-3">
                    {pageUser.skills?.length > 0 && (
                        <div className="bg-white rounded-md shadow-md ">
                            <span className="block py-1 pl-4 text-lg font-bold">
                                {t("Skills")}
                            </span>
                            <div className="border-b border-gray-200"></div>
                            <div className="space-y-1 p-1">
                                {pageUser.skills.map((skill, index) => (
                                    <span
                                        key={`skill-${index}`}
                                        className="block"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="bg-white rounded-md shadow-md space-y-2 py-2">
                        <span className="block pl-4 font-medium text-sm">
                            <Fa icon="newspaper" /> {pageUser.articles_count}{" "}
                            {t("articles(s) published")}
                        </span>
                        <span className="block pl-4 font-medium text-sm">
                            <Fa icon="comment" /> {pageUser.comments_count}{" "}
                            {t("comment(s) written")}
                        </span>
                    </div>
                </div>

                <div className="sm:w-8/12 lg:w-8/12">
                    <ArticleListing
                        queryParams={{
                            filter: {
                                user_id: pageUser.id,
                            },
                        }}
                    />
                </div>
            </div>
            <Modal
                show={abuseReportModal.show}
                onClose={() =>
                    setAbuseReportModal((prevState) => ({
                        ...prevState,
                        show: false,
                        message: "",
                        type: "",
                        submitting: false,
                    }))
                }
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold">{t("Report Abuse")}</h2>
                    <div className="border-b border-gray-200 my-2 w-full"></div>
                    <p className="text-sm text-gray-500">
                        {t(
                            "Please select the type of abuse you are reporting."
                        )}
                    </p>
                    <select
                        className="w-full border border-gray-300 rounded-lg"
                        value={abuseReportModal.type}
                        onChange={(e) => {
                            setAbuseReportModal((prevState) => ({
                                ...prevState,
                                type: e.target.value,
                            }));
                        }}
                    >
                        <option value="">{t("Select a type")}</option>
                        {Object.keys(available_abuse_report_types).map(
                            (key) => (
                                <option key={key} value={key}>
                                    {available_abuse_report_types[key]}
                                </option>
                            )
                        )}
                    </select>
                    {abuseReportModal.type === "" && (
                        <span>
                            <small className="text-red-500">
                                {t("Please select a type")}
                            </small>
                        </span>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        {t(
                            "Please provide a detailed description of what you believe should be reported about this profile."
                        )}
                    </p>
                    <textarea
                        className="w-full h-32 border max-h-[500px] min-h-12 border-gray-300 rounded-lg"
                        value={abuseReportModal.message}
                        minLength={10}
                        maxLength={2000}
                        onChange={(e) => {
                            setAbuseReportModal((prevState) => ({
                                ...prevState,
                                message: e.target.value,
                            }));
                        }}
                    />
                    {abuseReportModal.message.length < 10 && (
                        <span>
                            <small className="text-red-500">
                                {t("Please enter at least 10 characters")}
                            </small>
                        </span>
                    )}
                    {abuseReportModal.message.length > 2000 && (
                        <span>
                            <small className="text-red-500">
                                {t("Please enter at most 2000 characters")}
                            </small>
                        </span>
                    )}
                    <div className=" text-gray-500 mt-2 flex flex-row justify-end w-full">
                        <PrimaryButton
                            onClick={() => {
                                Swal.fire({
                                    title: t("Are you sure?"),
                                    text: t(
                                        "Do you really want to report this user?"
                                    ),
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: t("Yes"),
                                    cancelButtonText: t("No"),
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        submitAbuseReport();
                                    }
                                });
                            }}
                            disabled={
                                abuseReportModal.submitting ||
                                abuseReportModal.message.length < 10 ||
                                abuseReportModal.message.length > 2000 ||
                                abuseReportModal.type === ""
                            }
                        >
                            {abuseReportModal.submitting && (
                                <div className="mini-loader mr-2"></div>
                            )}
                            {t("Submit")}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

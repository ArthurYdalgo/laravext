import ArticleListing from "@/components/Article/ArticleListing";
import Dropdown from "@/components/Dropdown";
import DropdownButton from "@/components/DropdownButton";
import Fa from "@/components/Fa";
import FollowButton from "@/components/FollowButton";
import FormSaveButton from "@/components/FormSaveButton";
import ThreeDots from "@/components/Icons/ThreeDots";
import Modal from "@/components/Modal";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { sharedProps, nexusProps } from "@laravext/react";
import { visit  } from "@laravext/react/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default () => {
    const { t } = useTranslation();
    const { user } = sharedProps().auth;

    const [abuseReportModal, setAbuseReportModal] = useState({
        show: false,
        submitting: false,
        report: "",
    });

    const submitAbuseReport = () => {
        setAbuseReportModal((prevState) => ({
            ...prevState,
            submitting: true,
        }));
        axios
            .post(`/api/users/${pageUser.id}/report`, {
                report: abuseReportModal.report,
            })
            .then((response) => {
                setAbuseReportModal((prevState) => ({
                    ...prevState,
                    show: false,
                    submitting: false,
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
                Swal.fire({
                    title: t("Failed to report user"),
                    icon: "error",
                });
            });
    }

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
                    <div className="flex flex-col items-center space-y-2 w-full">
                        <span className="font-extrabold text-3xl">
                            {pageUser?.name}
                        </span>
                        {pageUser?.id != user?.id && (
                            <div className="flex">
                                <FollowButton followee={pageUser} />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="ml-1 transition inline-flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                                            <ThreeDots />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <DropdownButton
                                            onClick={() => {
                                                if(!user) {
                                                    Swal.fire({
                                                        title: t('You must be logged in to report this user'),
                                                        icon: 'info',
                                                        showCancelButton: true,
                                                        confirmButtonText: t('Login'),
                                                        cancelButtonText: t('Cancel')
                                                    }).then(({ isConfirmed }) => {
                                                        if (isConfirmed) {
                                                            visit(route('login'));
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
                        )}
                        <div className="text-center text-base mt-2 px-6">
                            {pageUser.biography}
                        </div>
                        <div className="border-b border-gray-200 w-full"></div>
                        <div className="text-center text-base mt-2 px-6">
                            links, location, etc
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
                        <span className="block pl-4 font-medium text-sm">
                            <Fa icon="hashtag" /> {pageUser.tags_count}{" "}
                            {t("tag(s) followed")}
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
                    }))
                }
                
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold">
                        {t("Report Abuse")}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t("Please provide a detailed description of what you believe should be reported about this profle.")}
                    </p>
                    <textarea
                        className="w-full h-32 border border-gray-300 rounded-lg"
                        value={abuseReportModal.report}
                        onChange={(e) => {
                            setAbuseReportModal((prevState) => ({
                                ...prevState,
                                report: e.target.value,
                            }));
                        }}
                    />
                    <div className=" text-gray-500 mt-2 flex flex-row justify-end w-full">
                        <PrimaryButton
                            loading={abuseReportModal.submitting}
                            onClick={() => {
                                Swal.fire({
                                    title: t("Are you sure?"),
                                    text: t("Do you really want to report this user?"),
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
                            disabled={abuseReportModal.submitting}
                        >
                            {abuseReportModal.submitting && <div className="mini-loader mr-2"></div>}{t("Submit")}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

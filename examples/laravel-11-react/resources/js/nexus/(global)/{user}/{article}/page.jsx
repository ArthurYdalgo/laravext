import Bookmark from "@/components/Bookmark";
import Tooltip from "@/components/Tooltip";
import { nexusProps, sharedProps } from "@laravext/react";
import { visit } from "@laravext/react/router";
import useStateRef from "react-usestateref";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Article from "@/components/Article/Article";
import Dropdown from "@/components/Dropdown";
import ThreeDots from "@/components/Icons/ThreeDots";
import DropdownButton from "@/components/DropdownButton";
import CopyToClipboard from "@/components/CopyToClipboard";
import Fa from "@/components/Fa";
import PrimaryButton from "@/components/PrimaryButton";
import { ReactionBarSelector } from '@charkour/react-reactions';
import GroupedReactions from "@/components/GroupedReactions";
import ReactionButton from "@/components/Article/ReactionButton";

export default () => {
    const { article } = nexusProps();
    const { t } = useTranslation();
    const { user } = sharedProps().auth;

    const { available_abuse_report_types } = sharedProps();

    const [abuseReportModal, setAbuseReportModal] = useStateRef({
        show: false,
        submitting: false,
        message: "",
        type: "",
    });

    const reactToArticle = (reaction) => {

    }

    const [bookmarked, setBookmarked] = useStateRef(
        article.user_has_bookmarked
    );

    const submitAbuseReport = () => {
        setAbuseReportModal((prevState) => ({
            ...prevState,
            submitting: true,
        }));
        axios
            .post(`/api/articles/${article.id}/abuse-reports`, {
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
                    title: t("Article reported successfully"),
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
                    title: t("Failed to report article"),
                    text: message,
                    icon: "error",
                });
            });
    };

    const toggleBookmark = () => {
        if (user) {
            let currentStatus = bookmarked;
            setBookmarked(!currentStatus);
            axios
                .put(`/api/articles/${article.id}/bookmark`)
                .then(({ data }) => {
                    setBookmarked(data.data.bookmarked);
                })
                .catch(() => {
                    setBookmarked(currentStatus);
                });

            return;
        }

        Swal.fire({
            title: t("You must be logged in to bookmark articles"),
            icon: "info",
            showCancelButton: true,
            confirmButtonText: t("Login"),
            cancelButtonText: t("Cancel"),
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                visit(route("login"));
            }
        });
    };

    return (
        <>
            <div className="flex ">
                <div className="hidden sm:block sm:w-20 lg:w-20 px-1">
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-center">
                            <ReactionButton onSelection={reactToArticle} />
                        </div>
                        <div className="flex justify-center">
                            <button className="rounded-full p-[10px]  hover:bg-gray-200">
                                <Fa icon="comment" size='lg' />
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <Tooltip
                                text={
                                    bookmarked
                                        ? t("Click to unbookmark this article")
                                        : t("Click to bookmark this article")
                                }
                            >
                                <Bookmark
                                    bookmarked={bookmarked}
                                    onClick={toggleBookmark}
                                    className={
                                        "p-1.5 transition-all  rounded-md " +
                                        (bookmarked
                                            ? " bg-slate-200 text-red-600"
                                            : "text-black hover:text-red-300")
                                    }
                                />
                            </Tooltip>
                        </div>
                        <div className="flex justify-center">
                            <Dropdown>
                                <Dropdown.Trigger className="flex justify-center">
                                    <button className="transition px-2 py-2 hover:bg-gray-200 rounded-full ">
                                        <ThreeDots />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="left">
                                    <DropdownButton>
                                        <span className="flex justify-between">
                                            {t("Copy Shareable Link")}{" "}
                                            <Fa
                                                icon="copy"
                                                className="mt-0.5"
                                            />
                                        </span>
                                    </DropdownButton>
                                    <div className="border-b border-gray-200 w-full"></div>
                                    <DropdownButton
                                        onClick={() => {
                                            if (!user) {
                                                Swal.fire({
                                                    title: t(
                                                        "You must be logged in to report this article"
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
                                        {t("Report Abuse")}
                                    </DropdownButton>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        {/* <button>
                        foo
                    </button> */}
                    </div>
                </div>
                <div className="lg:w-[65.5%] rounded-md bg-white mx-1 lg:mx-2">
                    {article.banner_url && (
                        <p align="center">
                            <img
                                src={article.banner_url}
                                className="shadow-md w-full rounded-t-md"
                                alt={article.title}
                            />
                        </p>
                    )}

                    <div className="flex justify-center">
                        <h1 className="px-8 text-[2.25rem] font-bold antialiased">
                            {article.title}
                        </h1>
                    </div>

                    <div className="article pre-wrap break-words ">
                        <Article html={article.html} />
                    </div>
                    <hr className="my-4" />
                </div>
                <div className="hidden lg:block lg:w-[20%] px-3">
                    author area
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
                            "Please provide a detailed description of what you believe should be reported about this article."
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
                                        "Do you really want to report this article?"
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

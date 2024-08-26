import { useState } from "react";
import useStateRef from "react-usestateref";
import Link from "../Link";
import Fa from "../Fa";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../SecondaryButton";
import LoadingButton from "../LoadingButton";
import { nexusProps, sharedProps } from "@laravext/react";
import {visit} from "@laravext/react";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../Modal";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";


export default ({ reply , onDelete = (reply) => {}}) => {
    const { user } = sharedProps().auth;
    const { t, i18n } = useTranslation();
    const { available_abuse_report_types } = sharedProps();
    const [liked, setLiked] = useState(reply.reactions?.length > 0);
    const [likesCount, setLikesCount] = useState(reply.reactions_count);

    const [replyHtml, setReplyHtml] = useState(reply.html);
    const [replyContent, setReplyContent] = useState(reply.content);

    const [editReply, setEditReply] = useState({
        mode: null,
        content: replyContent,
        preview: "",
        loadingPreview: false,
    });

    const editReplyContent = (content) => {
        setEditReply((prevState) => ({
            ...prevState,
            mode: 'edit'
        }));
    };

    const cancelEditReply = () => {
        setEditReply((prevState) => ({
            ...prevState,
            mode: null,
            content: replyContent,
            preview: "",
            loadingPreview: false,
        }));
    };

    const submitEditReply = () => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("Do you really want to update this reply?"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("Yes"),
            cancelButtonText: t("No"),
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`/api/comments/${reply.id}`, {
                        content: editReply.content,
                    })
                    .then((response) => {
                        setReplyContent(editReply.content);
                        setReplyHtml(response.data.data.html);
                        setEditReply((prevState) => ({
                            ...prevState,
                            mode: null,
                            preview: "",
                            loadingPreview: false,
                        }));
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: t("Failed to update reply"),
                            text: error.response?.data?.message,
                            icon: "error",
                        });
                    });
            }
        });
    };

    const previewEditReply = () => {
        setEditReply((prevState) => ({
            ...prevState,
            loadingPreview: true,
            mode: "preview",
        }));
        axios
            .post(`/api/tools/markdown-preview`, {
                markdown: editReply.content,
            })
            .then((response) => {
                setEditReply((prevState) => ({
                    ...prevState,
                    preview: response.data.data.html,
                    loadingPreview: false,
                }));
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: t("Failed to preview reply"),
                    text: error.response?.data?.message,
                    icon: "error",
                });
                setEditReply((prevState) => ({
                    ...prevState,
                    loadingPreview: false,
                }));
            });
    };




    const deleteReply = () => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("Yes, delete it!"),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/comments/${reply.id}`)
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: t("Deleted!"),
                            text: t("Your reply has been deleted."),
                        });

                        onDelete(reply);

                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: t("Oops..."),
                            text: t("Something went wrong!"),
                        });
                    });
            }
        });               
    }

    const submitAbuseReport = () => {
        setAbuseReportModal((prevState) => ({
            ...prevState,
            submitting: true,
        }));
        axios
            .post(`/api/comments/${reply.id}/abuse-reports`, {
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
                    title: t("Reply reported successfully"),
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
                    title: t("Failed to report reply"),
                    text: message,
                    icon: "error",
                });
            });
    };

    const [abuseReportModal, setAbuseReportModal] = useStateRef({
        show: false,
        submitting: false,
        message: "",
        type: "",
    });

    const likeComment = () => {
        setLiked(true);
        setLikesCount((prevState) => prevState + 1);

        axios
            .post(`/api/comments/${reply.id}/like`)
            .catch((error) => {
                console.error(error);
                setLiked(false);
                setLikesCount((prevState) => prevState - 1);
            });
    };

    const unlikeComment = () => {
        setLiked(false);
        setLikesCount((prevState) => prevState - 1);

        axios
            .delete(`/api/comments/${reply.id}/like`)
            .catch((error) => {
                console.error(error);
                setLiked(true);
                setLikesCount((prevState) => prevState + 1);
            });
    };

    return (
        <>
            <span className="w-12">
                <img
                    src={
                        reply.user.avatar_url ??
                        "/images/avatars/placeholder.png"
                    }
                    className="w-10 h-10 rounded-full"
                    alt={reply.user.name}
                />
            </span>
            <div className="w-full">
                <div className="flex flex-col w-full px-2 py-1 rounded-lg border-2 items-start">
                    <div className="flex justify-between w-full">
                        <span className="">
                            <Link
                                href={route("user", {
                                    user: reply.user.username,
                                })}
                                className="text-gray-700 font-semibold"
                            >
                                {reply.user.name}
                            </Link>
                            •
                            <span className="text-sm text-gray-500">
                                {moment(reply.created_at)
                                    .locale(i18n.language)
                                    .format('lll')}
                            </span>
                        </span>
                        <div>
                        {(!user || user?.id != reply.user_id) && (
                                <button
                                onClick={() => {
                                    if (!user) {
                                        Swal.fire({
                                            title: t(
                                                "You must be logged in to report this reply"
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
                                className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md">
                                    <Fa icon="flag" size="xs" />
                                </button>
                            )}
                            {user && user?.id == reply.user_id && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={editReplyContent}
                                     className="transition-all px-1 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md">
                                        <Fa
                                            icon="edit"
                                            
                                        />
                                    </button>
                                    <button onClick={deleteReply} className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md">
                                        <Fa
                                            icon="trash"
                                            
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {["edit", "preview"].includes(editReply.mode) ? (
                        <div className="w-full">
                            {editReply.mode === "edit" && (
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg max-h-[300px] h-32 min-h-12"
                                    value={editReply.content}
                                    maxLength={5000}
                                    onChange={(e) => {
                                        setEditReply((prevState) => ({
                                            ...prevState,
                                            content: e.target.value,
                                        }));
                                    }}
                                />
                            )}
                            {editReply.mode === "preview" &&
                                !editReply.loadingPreview && (
                                    <div
                                        className="w-full whitespace-pre-wrap comment-html px-3 py-2 mb-1.5 border max-h-[250px] h-32 min-h-12 border-gray-300 rounded-lg"
                                        dangerouslySetInnerHTML={{
                                            __html: editReply.preview,
                                        }}
                                    ></div>
                                )}
                            {editReply.mode === "preview" &&
                                editReply.loadingPreview && (
                                    <div className="w-full h-32 border border-gray-300 rounded-lg items-center justify-center flex mb-1.5">
                                        <div className="mini-loader"></div>
                                    </div>
                                )}
                            <div className="flex justify-between">
                                <div>
                                    <DangerButton onClick={cancelEditReply}>
                                        {t("Cancel")}
                                    </DangerButton>
                                </div>
                                <div className="flex space-x-2">
                                    <SecondaryButton
                                        disabled={
                                            !user ||
                                            editReply.content.length <= 0
                                        }
                                        onClick={() => {
                                            if (editReply.mode === "edit") {
                                                previewEditReply();
                                            } else {
                                                editReplyContent();
                                            }
                                        }}
                                    >
                                        {editReply.mode === "edit"
                                            ? t("Preview")
                                            : t("Edit")}
                                    </SecondaryButton>
                                    <PrimaryButton
                                        onClick={submitEditReply}
                                        disabled={
                                            !user ||
                                            editReply.content.length <= 0
                                        }
                                    >
                                        {t("Submit")}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p
                            className="text-sm whitespace-pre-wrap py-2 comment-html"
                            dangerouslySetInnerHTML={{
                                __html: replyHtml,
                            }}
                        ></p>
                    )}
                </div>
                <div className="flex justify-start mt-2 space-x-6 px-2">
                    <button onClick={liked ? unlikeComment : likeComment}>
                        <Fa
                            icon="heart"
                            size="sm"
                            className={
                                "transition-all mr-1 cursor-pointer text-gray-500 " +
                                (liked
                                    ? "text-red-600"
                                    : " hover:text-red-300")
                            }
                        /> • {likesCount} {likesCount == 1 ? t("like") : t("likes")}
                    </button>
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
                                        "Do you really want to report this reply?"
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

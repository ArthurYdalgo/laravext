import { useState } from "react";
import useStateRef from "react-usestateref";
import Link from "../Link";
import Fa from "../Fa";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../SecondaryButton";
import LoadingButton from "../LoadingButton";
import Reply from "./Reply";
import { nexusProps, sharedProps } from "@laravext/react";
import Swal from "sweetalert2";
import Modal from "../Modal";
import PrimaryButton from "../PrimaryButton";
import { visit } from "@laravext/react/router";
import DangerButton from "../DangerButton";

export default ({ comment, onDelete = (comment) => {} }) => {
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;
    const [repliesCount, setRepliesCount] = useState(comment.replies_count);
    const { available_abuse_report_types } = sharedProps();

    const [repliesPagination, setRepliesPagination, repliesPaginationRef] =
        useStateRef({
            data: comment.replies ?? [],
            meta: {},
            loading: false,
            page: 0,
            per_page: 5,
            hasLoadedAtLeastOnce: false,
        });

    const [newReply, setNewReply] = useStateRef({
        content: "",
        preview: "",
        loadingPreview: false,
        mode: null,
    });

    const editNewReply = () => {
        setNewReply((prevState) => ({
            ...prevState,
            mode: "edit",
        }));

        return;
    };

    const cancelNewReply = () => {
        setNewReply((prevState) => ({
            ...prevState,
            mode: null,
            content: "",
            preview: "",
            loadingPreview: false,
        }));
    };

    const [commentHtml, setCommentHtml] = useState(comment.html);
    const [commentContent, setCommentContent] = useState(comment.content);

    const [editComment, setEditComment] = useStateRef({
        mode: null,
        content: commentContent,
        preview: "",
        loadingPreview: false,
    });

    const editCommentContent = () => {
        setEditComment((prevState) => ({
            ...prevState,
            mode: "edit",
        }));

        return;
    };

    const cancelEditComment = () => {
        setEditComment((prevState) => ({
            ...prevState,
            mode: null,
            content: commentContent,
            preview: "",
            loadingPreview: false,
        }));
    };

    const submitEditComment = () => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("Do you really want to edit this comment?"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("Yes"),
            cancelButtonText: t("No"),
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`/api/comments/${comment.id}`, {
                        content: editComment.content,
                    })
                    .then((response) => {
                        setCommentHtml(response.data.data.html);
                        setCommentContent(response.data.data.content);
                        setEditComment((prevState) => ({
                            ...prevState,
                            mode: null,
                            content: response.data.data.content,
                            preview: "",
                            loadingPreview: false,
                        }));
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: t("Failed to edit comment"),
                            text: error.response?.data?.message ?? null,
                            icon: "error",
                        });
                    });
            }
        });
    };

    const previewEditComment = () => {
        setEditComment((prevState) => ({
            ...prevState,
            mode: "preview",
            loadingPreview: true,
        }));

        axios
            .post("/api/tools/markdown-preview", {
                markdown: editComment.content,
            })
            .then(({ data }) => {
                setEditComment((prevState) => ({
                    ...prevState,
                    preview: data.data.html,
                    loadingPreview: false,
                }));
            })
            .catch(() => {
                setEditComment((prevState) => ({
                    ...prevState,
                    loadingPreview: false,
                }));

                Swal.fire({
                    title: t(
                        "An error occurred while trying to preview the markdown"
                    ),
                    icon: "error",
                    confirmButtonText: t("OK"),
                });

                return;
            });

        return;
    };

    const [recentlyCreatedReplyIds, setRecentlyCreatedReplyIds] = useStateRef(
        []
    );

    const submitNewReply = () => {
        axios
            .post(`/api/comments/${comment.id}/replies`, {
                content: newReply.content,
            })
            .then((response) => {
                setRepliesPagination((prevState) => ({
                    ...prevState,
                    data: [response.data.data, ...prevState.data],
                }));
                setRepliesCount(repliesCount + 1);
                setNewReply((prevState) => ({
                    ...prevState,
                    content: "",
                    preview: "",
                    mode: null,
                }));

                setRecentlyCreatedReplyIds((prevState) => [
                    response.data.data.id,
                    ...prevState,
                ]);

                Swal.fire({
                    title: t("Reply submitted successfully"),
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: t("Failed to submit reply"),
                    icon: "error",
                });
            });
    };

    const previewNewReply = () => {
        setNewReply((prevState) => ({
            ...prevState,
            mode: "preview",
            loadingPreview: true,
        }));

        axios
            .post("/api/tools/markdown-preview", {
                markdown: newReply.content,
            })
            .then(({ data }) => {
                setNewReply((prevState) => ({
                    ...prevState,
                    preview: data.data.html,
                    loadingPreview: false,
                }));
            })
            .catch(() => {
                setNewReply((prevState) => ({
                    ...prevState,
                    loadingPreview: false,
                }));

                Swal.fire({
                    title: t(
                        "An error occurred while trying to preview the markdown"
                    ),
                    icon: "error",
                    confirmButtonText: t("OK"),
                });

                return;
            });

        return;
    };

    const paginateRepliesTo = ({ page, perPage, clearData = true }) => {
        setRepliesPagination((prevState) => ({
            ...prevState,
            page,
            per_page: perPage,
        }));
        fetchReplies(clearData);
    };

    const [liked, setLiked] = useState(comment.reactions?.length > 0);
    const [likesCount, setLikesCount] = useState(comment.reactions_count);

    const likeComment = () => {
        setLiked(true);
        setLikesCount((prevState) => prevState + 1);

        axios
            .post(`/api/comments/${comment.id}/like`)
            .then((response) => {
                console.log(response);
            })
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
            .delete(`/api/comments/${comment.id}/like`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                setLiked(true);
                setLikesCount((prevState) => prevState + 1);
            });
    };

    const replyWasDeleted = (reply) => {
        setRepliesCount((prevState) => prevState - 1);
        setRepliesPagination((prevState) => ({
            ...prevState,
            data: prevState.data.filter((r) => r.id != reply.id),
        }));
    };

    const submitAbuseReport = () => {
        setAbuseReportModal((prevState) => ({
            ...prevState,
            submitting: true,
        }));
        axios
            .post(`/api/comments/${comment.id}/abuse-reports`, {
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
                    title: t("Comment reported successfully"),
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
                    title: t("Failed to report comment"),
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

    const deleteComment = () => {
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
                axios
                    .delete(`/api/comments/${comment.id}`)
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: t("Deleted!"),
                            text: t("Your comment has been deleted."),
                        });

                        onDelete(comment);
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
    };

    const fetchReplies = () => {
        setRepliesPagination((prevState) => ({ ...prevState, loading: true }));

        let params = {
            page: repliesPaginationRef.current.page,
            per_page: repliesPaginationRef.current.per_page,
            include: "user",
            filter: {
                exclude_ids: recentlyCreatedReplyIds.join(","),
            },
        };

        axios
            .get(`/api/comments/${comment.id}/replies`, {
                params,
            })
            .then((response) => {
                setRepliesPagination((prevState) => ({
                    ...prevState,
                    data: [...prevState.data, ...response.data.data],
                    meta: response.data.meta,
                    loading: false,
                    hasLoadedAtLeastOnce: true,
                }));
            })
            .catch((error) => {
                console.error(error);
                setRepliesPagination((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    return (
        <>
            <span className="w-12">
                <img
                    src={
                        comment.user.avatar_url ??
                        "/images/avatars/placeholder.png"
                    }
                    className="w-10 h-10 rounded-full"
                    alt={comment.user.name}
                />
            </span>
            <div className="w-full">
                <div className="flex flex-col w-full px-2 py-1 rounded-lg border-2 items-start">
                    <div className="flex justify-between w-full">
                        <span className="">
                            <Link
                                href={route("user", {
                                    user: comment.user.username,
                                })}
                                className="text-gray-700 font-semibold"
                            >
                                {comment.user.name}
                            </Link>{" "}
                            •{" "}
                            <span className="text-sm text-gray-500">
                                {moment(comment.created_at)
                                    .locale(i18n.language)
                                    .fromNow()}
                            </span>
                        </span>
                        <div>
                            {(!user || user?.id != comment.user_id) && (
                                <button
                                    onClick={() => {
                                        if (!user) {
                                            Swal.fire({
                                                title: t(
                                                    "You must be logged in to report this comment"
                                                ),
                                                icon: "info",
                                                showCancelButton: true,
                                                confirmButtonText: t("Login"),
                                                cancelButtonText: t("Cancel"),
                                            }).then(({ isConfirmed }) => {
                                                if (isConfirmed) {
                                                    visit(route("login"));
                                                }
                                            });
                                            return;
                                        }
                                        setAbuseReportModal((prevState) => ({
                                            ...prevState,
                                            show: true,
                                        }));
                                    }}
                                    className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md"
                                >
                                    <Fa icon="flag" size="xs" />
                                </button>
                            )}
                            {user && user?.id == comment.user_id && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={editCommentContent}
                                        className="transition-all px-1 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md"
                                    >
                                        <Fa icon="edit" />
                                    </button>
                                    <button
                                        onClick={deleteComment}
                                        className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md"
                                    >
                                        <Fa icon="trash" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {["edit", "preview"].includes(editComment.mode) ? (
                        <div className="w-full">
                            {editComment.mode === "edit" && (
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg max-h-[300px] h-32 min-h-12"
                                    value={editComment.content}
                                    maxLength={5000}
                                    onChange={(e) => {
                                        setEditComment((prevState) => ({
                                            ...prevState,
                                            content: e.target.value,
                                        }));
                                    }}
                                />
                            )}
                            {editComment.mode === "preview" &&
                                !editComment.loadingPreview && (
                                    <div
                                        className="w-full whitespace-pre-wrap comment-html px-3 py-2 mb-1.5 border max-h-[250px] h-32 min-h-12 border-gray-300 rounded-lg"
                                        dangerouslySetInnerHTML={{
                                            __html: editComment.preview,
                                        }}
                                    ></div>
                                )}
                            {editComment.mode === "preview" &&
                                editComment.loadingPreview && (
                                    <div className="w-full h-32 border border-gray-300 rounded-lg items-center justify-center flex mb-1.5">
                                        <div className="mini-loader"></div>
                                    </div>
                                )}
                            <div className="flex justify-between">
                                <div>
                                    <DangerButton onClick={cancelEditComment}>
                                        {t("Cancel")}
                                    </DangerButton>
                                </div>
                                <div className="flex space-x-2">
                                    <SecondaryButton
                                        disabled={
                                            !user ||
                                            editComment.content.length <= 0
                                        }
                                        onClick={() => {
                                            if (editComment.mode === "edit") {
                                                previewEditComment();
                                            } else {
                                                editCommentContent();
                                            }
                                        }}
                                    >
                                        {editComment.mode === "edit"
                                            ? t("Preview")
                                            : t("Edit")}
                                    </SecondaryButton>
                                    <PrimaryButton
                                        onClick={submitEditComment}
                                        disabled={
                                            !user ||
                                            editComment.content.length <= 0
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
                                __html: commentHtml,
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
                                (liked ? "text-red-600" : " hover:text-red-300")
                            }
                        />{" "}
                        • {likesCount}{" "}
                        {likesCount == 1 ? t("like") : t("likes")}
                    </button>
                    <button
                        onClick={() => {
                            if (["edit", "preview"].includes(newReply.mode)) {
                                return;
                            }

                            if (!user) {
                                Swal.fire({
                                    title: t(
                                        "You must be logged in to reply to this comment"
                                    ),
                                    icon: "info",
                                    showCancelButton: true,
                                    confirmButtonText: t("Login"),
                                    cancelButtonText: t("Cancel"),
                                }).then(({ isConfirmed }) => {
                                    if (isConfirmed) {
                                        visit(route("login"));
                                    }
                                });
                                return;
                            }

                            editNewReply();
                        }}
                    >
                        <Fa
                            icon="comment-medical"
                            size="sm"
                            className="transition-all mr-1 cursor-pointer text-gray-500 hover:text-blue-300"
                        />{" "}
                        • {repliesCount}{" "}
                        {repliesCount == 1 ? t("reply") : t("replies")}
                    </button>
                </div>
                {["edit", "preview"].includes(newReply.mode) && (
                    <div>
                        <div className="flex w-full mt-2">
                            <img
                                src={
                                    user.avatar_url ??
                                    "/images/avatars/placeholder.png"
                                }
                                className="w-8 h-8 rounded-full"
                                alt={user.name}
                            />
                            <div className="w-full ml-2">
                                {newReply.mode === "edit" && (
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg max-h-[300px] h-32 min-h-12"
                                        value={newReply.content}
                                        maxLength={5000}
                                        onChange={(e) => {
                                            setNewReply((prevState) => ({
                                                ...prevState,
                                                content: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                                {newReply.mode === "preview" && (
                                    <div
                                        className="w-full whitespace-pre-wrap comment-html px-3 py-2 mb-1.5 border max-h-[250px] h-32 min-h-12 border-gray-300 rounded-lg"
                                        dangerouslySetInnerHTML={{
                                            __html: newReply.preview,
                                        }}
                                    ></div>
                                )}
                                <div className="flex justify-between">
                                    <div>
                                        <DangerButton onClick={cancelNewReply}>
                                            {t("Cancel")}
                                        </DangerButton>
                                    </div>
                                    <div className="flex space-x-2">
                                        <SecondaryButton
                                            disabled={
                                                !user ||
                                                newReply.content.length <= 0
                                            }
                                            onClick={() => {
                                                if (newReply.mode === "edit") {
                                                    previewNewReply();
                                                } else {
                                                    editNewReply();
                                                }
                                            }}
                                        >
                                            {newReply.mode === "edit"
                                                ? t("Preview")
                                                : t("Edit")}
                                        </SecondaryButton>
                                        <PrimaryButton
                                            onClick={submitNewReply}
                                            disabled={
                                                !user ||
                                                newReply.content.length <= 0
                                            }
                                        >
                                            {t("Submit")}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {
                    <div className="mt-2 flex flex-col">
                        <div className="flex flex-col">
                            {repliesPagination.data.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="flex w-full py-1 items-start "
                                >
                                    <Reply
                                        reply={reply}
                                        onDelete={replyWasDeleted}
                                    />
                                </div>
                            ))}
                        </div>
                        {(repliesPagination.meta?.current_page <
                            repliesPagination.meta?.last_page ||
                            (comment.replies_count > 0 &&
                                !repliesPagination.hasLoadedAtLeastOnce)) && (
                            <LoadingButton
                                customNotLoadingClass="border uppercase border-gray-400 tracking-widest text-sm py-1 rounded-lg w-full text-gray-500 flex justify-center"
                                customLoadingClass="border uppercase tracking-widest text-sm py-1 rounded w-full text-gray-500 flex justify-center"
                                onClick={() => {
                                    paginateRepliesTo({
                                        page: repliesPagination.page + 1,
                                        perPage: repliesPagination.per_page,
                                        clearData: false,
                                    });
                                }}
                                loading={repliesPagination.loading}
                            >
                                {repliesPagination.loading
                                    ? t("Loading")
                                    : repliesPagination.hasLoadedAtLeastOnce
                                    ? t("Load More")
                                    : t("Load Replies")}
                            </LoadingButton>
                        )}
                    </div>
                }
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

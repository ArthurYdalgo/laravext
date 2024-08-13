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

export default ({ comment , onDelete = (comment) => {}}) => {
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;
    const [repliesCount, setRepliesCount] = useState(comment.replies_count);
    const [hasBeenDeleted, setHasBeenDeleted] = useState(false);

    const [repliesPagination, setRepliesPagination, repliesPaginationRef] =
        useStateRef({
            data: comment.replies ?? [],
            meta: {},
            loading: false,
            page: 0,
            per_page: 5,
            hasLoadedAtLeastOnce: false,
        });

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
                axios.delete(`/api/comments/${comment.id}`)
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
    }


    const fetchReplies = () => {
        setRepliesPagination((prevState) => ({ ...prevState, loading: true }));

        let params = {
            page: repliesPaginationRef.current.page,
            per_page: repliesPaginationRef.current.per_page,
            include: "user",
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
                                <button className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md">
                                    <Fa icon="flag" size="xs" />
                                </button>
                            )}
                            {user && user?.id == comment.user_id && (
                                <div className="flex space-x-2">
                                    <button className="transition-all px-1 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md">
                                        <Fa
                                            icon="edit"
                                            
                                        />
                                    </button>
                                    <button onClick={deleteComment} className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md">
                                        <Fa
                                            icon="trash"
                                            
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <p
                        className="text-sm whitespace-pre-wrap py-2 comment-html"
                        dangerouslySetInnerHTML={{
                            __html: comment.html,
                        }}
                    ></p>
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
                    <span>
                        <Fa
                            icon="comment-medical"
                            size="sm"
                            className="transition-all mr-1 cursor-pointer text-gray-500 hover:text-blue-300"
                        />{" "}
                        • {comment.replies_count}{" "}
                        {comment.replies_count == 1 ? t("reply") : t("replies")}
                    </span>
                </div>
                {
                    <div className="mt-2 flex flex-col">
                        <div className="flex flex-col">
                            {repliesPagination.data.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="flex w-full py-1 items-start "
                                >
                                    <Reply reply={reply} onDelete={replyWasDeleted} />
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
        </>
    );
};

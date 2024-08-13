import { useState } from "react";
import useStateRef from "react-usestateref";
import Link from "../Link";
import Fa from "../Fa";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../SecondaryButton";
import LoadingButton from "../LoadingButton";
import { nexusProps, sharedProps } from "@laravext/react";
import Swal from "sweetalert2";
import axios from "axios";

export default ({ reply , onDelete = (reply) => {}}) => {
    const { user } = sharedProps().auth;
    const { t, i18n } = useTranslation();
    const [liked, setLiked] = useState(reply.reactions?.length > 0);
    const [likesCount, setLikesCount] = useState(reply.reactions_count);

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

    const likeComment = () => {
        setLiked(true);
        setLikesCount((prevState) => prevState + 1);

        axios
            .post(`/api/comments/${reply.id}/like`)
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
            .delete(`/api/comments/${reply.id}/like`)
            .then((response) => {
                console.log(response);
            })
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
                                    .fromNow()}
                            </span>
                        </span>
                        <div>
                        {(!user || user?.id != reply.user_id) && (
                                <button className="transition-all px-1 text-red-500  hover:bg-red-500 hover:text-white rounded-md">
                                    <Fa icon="flag" size="xs" />
                                </button>
                            )}
                            {user && user?.id == reply.user_id && (
                                <div className="flex space-x-2">
                                    <button className="transition-all px-1 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md">
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
                    <p
                        className="text-sm whitespace-pre-wrap py-2 comment-html"
                        dangerouslySetInnerHTML={{
                            __html: reply.html,
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
                                (liked
                                    ? "text-red-600"
                                    : " hover:text-red-300")
                            }
                        />{" "}
                        • {likesCount}{" "}
                        {likesCount == 1 ? t("like") : t("likes")}
                    </button>
                </div>
            </div>
        </>
    );
};

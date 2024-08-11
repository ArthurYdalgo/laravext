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
import { ReactionBarSelector } from "@charkour/react-reactions";
import GroupedReactions from "@/components/GroupedReactions";
import ReactionButton from "@/components/Article/ReactionButton";
import Link from "@/components/Link";
import moment from "moment/min/moment-with-locales";
import axios from "axios";
import FollowButton from "@/components/FollowButton";
import ProfileLink from "@/components/ProfileLink";
import { useEffect } from "react";
import LoadingButton from "@/components/LoadingButton";

export default () => {
    const { article, latest_articles_from_user } = nexusProps();
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;

    const { available_abuse_report_types } = sharedProps();

    const [commentsPagination, setCommentsPagination, commentsPaginationRef] =
        useStateRef({
            data: [],
            meta: {},
            loading: true,
            page: 1,
            per_page: 3,
        });

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        setCommentsPagination((prevState) => ({ ...prevState, loading: true }));

        let params = {
            page: commentsPaginationRef.current.page,
            per_page: commentsPaginationRef.current.per_page,
            include: "user",
        };

        axios
            .get(`/api/articles/${article.id}/comments`, {
                params,
            })
            .then((response) => {
                setCommentsPagination((prevState) => ({
                    ...prevState,
                    data: [...prevState.data, ...response.data.data],
                    meta: response.data.meta,
                    loading: false,
                }));
            })
            .catch((error) => {
                console.error(error);
                setCommentsPagination((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    const paginateCommentsTo = ({ page, perPage, clearData = true }) => {
        setCommentsPagination((prevState) => ({
            ...prevState,
            page,
            per_page: perPage,
        }));
        fetchComments(clearData);
    };

    const [abuseReportModal, setAbuseReportModal] = useStateRef({
        show: false,
        submitting: false,
        message: "",
        type: "",
    });

    const [userReactions, setUserReactions] = useStateRef(
        article.user_reactions
    );
    const [groupedReactions, setGroupedReactions] = useStateRef(
        article.reactions
    );
    const [reactionsCount, setReactionsCount] = useStateRef(
        article.reactions_count
    );

    const [commentsCount, setCommentsCount] = useStateRef(
        article.comments_count
    );

    const [newComment, setNewComment] = useStateRef("");

    const reactToArticle = (reaction) => {
        setReactionsCount(reactionsCount + 1);
        setGroupedReactions(
            groupedReactions.map((groupedReaction) => {
                if (groupedReaction.reaction === reaction) {
                    return {
                        ...groupedReaction,
                        count: groupedReaction.count + 1,
                    };
                }

                return groupedReaction;
            })
        );

        setUserReactions([...userReactions, reaction]);

        axios
            .post(`/api/articles/${article.id}/reactions`, {
                reaction: reaction,
            })
            .then((response) => {
                setUserReactions(response.data.data);

                axios
                    .get(`/api/articles/${article.id}/grouped-reactions`)
                    .then((response) => {
                        setGroupedReactions(response.data.data);

                        // sum the count of all reactions
                        setReactionsCount(
                            response.data.data.reduce((acc, reaction) => {
                                return acc + reaction.count;
                            }, 0)
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const unreactToArticle = (reaction) => {
        setReactionsCount(reactionsCount - 1);
        setGroupedReactions(
            groupedReactions
                .map((groupedReaction) => {
                    if (groupedReaction.reaction === reaction) {
                        let reaction = {
                            ...groupedReaction,
                            count: groupedReaction.count - 1,
                        };

                        if (reaction.count <= 0) {
                            return null;
                        }

                        return reaction;
                    }

                    return groupedReaction;
                })
                .filter((groupedReaction) => groupedReaction !== null)
        );

        setUserReactions(
            userReactions.filter((userReaction) => userReaction !== reaction)
        );

        axios
            .delete(`/api/articles/${article.id}/reactions`, {
                data: {
                    reaction: reaction,
                },
            })
            .then((response) => {
                setUserReactions(response.data.data);

                axios
                    .get(`/api/articles/${article.id}/grouped-reactions`)
                    .then((response) => {
                        setGroupedReactions(response.data.data);

                        setReactionsCount(
                            response.data.data.reduce((acc, reaction) => {
                                return acc + reaction.count;
                            }, 0)
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const shareArticle = () => {
        // make api request to get shareable link
        axios
            .get(`/api/articles/${article.id}/shareable-link`, {
                timeout: 3000,
            })
            .then((response) => {
                // copy to clipboard
                navigator.clipboard.writeText(
                    response.data.data.shareable_link
                );

                // show success message
                Swal.fire({
                    title: t("Link copied to clipboard"),
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#2d3748",
                });
            })
            .catch((error) => {
                console.error(error);
                navigator.clipboard.writeText(
                    route("article.short-link", {
                        article: article.short_link_code,
                    })
                );

                // show success message
                Swal.fire({
                    title: t("Link copied to clipboard"),
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#2d3748",
                });
            });
        // swal to notify it was copied to clipbloard
    };

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
                            <ReactionButton
                                onSelection={reactToArticle}
                                closeOnReactionClick={false}
                                reactionsCount={reactionsCount}
                                highlightKeys={userReactions}
                                onReact={(reaction) => {
                                    if (!user) {
                                        Swal.fire({
                                            title: t(
                                                "You must be logged in to react to articles"
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

                                    if (userReactions.includes(reaction)) {
                                        unreactToArticle(reaction);
                                    } else {
                                        reactToArticle(reaction);
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-col items-center">
                                <button
                                    className="rounded-full px-[12px] py-[10px]  hover:bg-gray-200"
                                    onClick={() => {
                                        document
                                            .getElementById("comments")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                >
                                    <Fa icon="comment" size="lg" />
                                </button>
                                {article.comments_count}
                            </div>
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
                            <Tooltip text={t("Share this article")}>
                                <button
                                    className="rounded-full px-[12px] py-[9px] hover:bg-gray-200"
                                    onClick={shareArticle}
                                >
                                    <Fa icon="share-alt" size="lg" />
                                </button>
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
                    <div className="flex justify-start px-8 mt-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <Link
                                href={route("user", {
                                    user: article.user.username,
                                })}
                            >
                                <img
                                    src={
                                        article.user.avatar_url ??
                                        "/images/avatars/placeholder.png"
                                    }
                                    className="w-10 h-10 rounded-full"
                                    alt={article.user.name}
                                />
                            </Link>
                        </div>
                        <div className="flex flex-col py-2">
                            <span className="text-lg font-bold hover:underline">
                                <Link
                                    href={route("user", {
                                        user: article.user.username,
                                    })}
                                >
                                    {article.user.name}
                                </Link>
                            </span>
                            <span className="text-sm text-gray-500">
                                {moment(article.published_at)
                                    .locale(i18n.language)
                                    .format("LL")}
                                {article.updated_at > article.published_at && (
                                    <span className="text-xs text-gray-500">
                                        {" "}
                                        - {t("Updated on")}{" "}
                                        {moment(article.updated_at)
                                            .locale(i18n.language)
                                            .format("LL")}
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-8 pt-3">
                        <GroupedReactions
                            includeMissingReactions={true}
                            fontSize="lg"
                            compressed={false}
                            groupedReactions={groupedReactions}
                        />
                    </div>
                    <div className="flex justify-start">
                        <h1 className="px-8 text-[2.25rem] font-bold antialiased font-sans">
                            {article.title}
                        </h1>
                    </div>
                    <div className="flex justify-start px-8 space-x-2">
                        {article.tags
                            .sort((a, b) => a.slug.localeCompare(b.slug))
                            .map((tag) => {
                                // hash the tag and generate a random hex color
                                const hash = tag.slug
                                    .split("")
                                    .reduce((acc, char) => {
                                        return (
                                            char.charCodeAt(0) +
                                            ((acc << 5) - acc)
                                        );
                                    }, 0);

                                const color = `#${(
                                    (hash & 0x00ffffff) |
                                    0x1000000
                                )
                                    .toString(16)
                                    .substring(1)}`;

                                return (
                                    <Link
                                        key={tag.slug}
                                        href={route("search", {
                                            tags: tag.slug,
                                        })}
                                        params={{ tags: tag.slug }}
                                        className="flex row hover:underline cursor-pointer"
                                    >
                                        <span
                                            style={{
                                                color: color,
                                            }}
                                        >
                                            #
                                        </span>
                                        {tag.slug}
                                    </Link>
                                );
                            })}
                    </div>

                    <div className="article pre-wrap break-words ">
                        {/* <Article html={article.html} /> */}
                    </div>

                    <div className="px-2">
                        <div className="px-4 border-b border-gray-200 w-full"></div>
                    </div>

                    <h3 className="px-4 mt-4 mb-2 font-semibold">{t("Comments")}</h3>
                    <div className="space-y-2 px-4 py-4" id="comments">
                        <div className="felx-col space-y-3 ">
                            {commentsPagination.data.map((comment) => (
                                <div key={comment.id} className="">
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route("user", {
                                                user: comment.user.username,
                                            })}
                                        >
                                            <img
                                                src={
                                                    comment.user.avatar_url ??
                                                    "/images/avatars/placeholder.png"
                                                }
                                                className="w-10 h-10 rounded-full"
                                                alt={comment.user.name}
                                            />
                                        </Link>
                                        <span className="flex text-md font-semibold flex-col">
                                            <Link
                                                href={route("user", {
                                                    user: comment.user.username,
                                                })}
                                            >
                                                {comment.user.name}
                                            </Link>
                                            <span className="text-xs text-gray-500">
                                                {moment(comment.created_at)
                                                    .locale(i18n.language)
                                                    .format("LLL")}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col py-2">
                                        <p className="text-sm px-2" dangerouslySetInnerHTML={{__html: comment.html}} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            {(commentsPagination.meta?.current_page <
                                commentsPagination.meta?.last_page ||
                                commentsPagination.loading) && (
                                <LoadingButton
                                    loading={commentsPagination.loading}
                                    onClick={() => {
                                        paginateCommentsTo({
                                            page: commentsPagination.page + 1,
                                            perPage:
                                                commentsPagination.per_page,
                                            clearData: false,
                                        });
                                    }}
                                >
                                    {commentsPagination.loading
                                        ? t("Loading")
                                        : t("Load More")}
                                </LoadingButton>
                            )}
                            {!commentsPagination.loading &&
                                commentsPagination.meta?.current_page >=
                                    commentsPagination.meta?.last_page && (
                                    <span className="text-gray-500 text-md">
                                        {t("No more comments to load")}{" "}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-[400px] px-3 space-y-2">
                    <div
                        className="flex flex-col space-y-2 border-t-[30px] bg-white shadow rounded-md p-4 pt-0 w-full"
                        style={{
                            borderTopColor:
                                article.user.banner_hex_color ?? "#000000",
                        }}
                    >
                        <div className="-mt-4 flex items-end">
                            <Link
                                href={route("user", {
                                    user: article.user.username,
                                })}
                            >
                                <img
                                    src={
                                        article.user.avatar_url ??
                                        "/images/avatars/placeholder.png"
                                    }
                                    className="w-14 h-14 rounded-full border-2 border-white"
                                    alt={article.user.name}
                                />
                            </Link>
                            <span className="text-lg font-semibold ml-1 mb-1">
                                <Link
                                    className="hover:underline"
                                    href={route("user", {
                                        user: article.user.username,
                                    })}
                                >
                                    {article.user.name}
                                </Link>{" "}
                                {article.user.pronouns && (
                                    <span className="text-xs text-gray-500">
                                        ({article.user.pronouns})
                                    </span>
                                )}
                            </span>
                        </div>
                        <FollowButton
                            followee={article.user}
                            disabled={user && user?.id == article.user_id}
                        />
                        <div className="flex flex-col space-y-2 mt-2">
                            <span className="text-sm text-gray-500">
                                {article.user.biography}
                            </span>
                            <div className="border-b border-gray-200 w-full"></div>
                            {article.user.location && (
                                <span className="text-sm text-gray-500">
                                    <Fa icon="location-dot" className="mr-1" />
                                    {article.user.location}
                                </span>
                            )}
                            {article.user.work && (
                                <span className="text-sm text-gray-500">
                                    <Fa icon="suitcase" className="mr-1" />
                                    {article.user.work}
                                </span>
                            )}
                            {article.user.education && (
                                <span className="text-sm text-gray-500">
                                    <Fa
                                        icon="graduation-cap"
                                        className="mr-1"
                                    />
                                    {article.user.education}
                                </span>
                            )}
                        </div>
                    </div>
<<<<<<< Updated upstream
                
                    {latest_articles_from_user.length > 0 && <div className="flex flex-col space-y-2 bg-white rounded-md shadow p-3 w-full">
                        <h2 className="text-lg font-bold">{t("More from")} <Link className="text-blue-500" href={route('user', article.user.username)}>{article.user.name}</Link></h2>
                        <div className="border-b border-gray-200 w-full"></div>
                        {latest_articles_from_user.map((article, index) => (
                            <div  key={article.id}>
                            <div key={article.id} className="flex flex-col space-y-2">
                                <Link href={route("user.article", { user: article.user.username, article: article.slug })}>
                                    <h3 className="text-lg hover:underline">{article.title}</h3>
                                </Link>
                                <span className="text-sm text-gray-500">{moment(article.published_at).locale(i18n.language).format("LL")}</span>
                            </div>
                            {index < latest_articles_from_user.length - 1 && <div className="border-b border-gray-200 w-full"></div>}
                            </div>
                        ))}
                    </div>}
=======

                    {latest_articles_from_user.length > 0 && (
                        <div className="flex flex-col space-y-2 bg-white rounded-md shadow p-3 w-full">
                            <h2 className="text-lg font-bold">
                                {t("More from")}{" "}
                                <Link
                                    className="text-blue-500"
                                    href={route("user", article.user.username)}
                                >
                                    {article.user.name}
                                </Link>
                            </h2>
                            <div className="border-b border-gray-200 w-full"></div>
                            {latest_articles_from_user.map((article, index) => (
                                <div key={article.id}>
                                    <div
                                        key={article.id}
                                        className="flex flex-col space-y-2"
                                    >
                                        <Link
                                            href={route("user.article", {
                                                user: article.user.username,
                                                article: article.slug,
                                            })}
                                        >
                                            <h3 className="text-lg hover:underline">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <span className="text-sm text-gray-500">
                                            {moment(article.published_at)
                                                .locale(i18n.language)
                                                .format("LL")}
                                        </span>
                                    </div>
                                    {index <
                                        latest_articles_from_user.length -
                                            1 && (
                                        <div className="border-b border-gray-200 w-full"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
>>>>>>> Stashed changes
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

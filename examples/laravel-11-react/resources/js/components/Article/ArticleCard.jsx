import moment from "moment/min/moment-with-locales";
import { visit } from "@laravext/react";
import GroupedReactions from "@/components/GroupedReactions";
import { useTranslation } from "react-i18next";
import Fa from "@/components/Fa";
import Bookmark from "@/components/Bookmark";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { sharedProps } from "@laravext/react";
import Link from "../Link";
import useSearch from "@/hooks/useSearch";

export default ({ article }) => {
    const { t, i18n } = useTranslation();
    const { user } = sharedProps().auth;
    const [isBookmarked, setIsBookmarked] = useState(
        article.has_been_bookmarked_by_user ?? false
    );
    const { setText } = useSearch();

    const toggleBookmark = () => {
        if (user) {
            let currentStatus = isBookmarked;
            setIsBookmarked(!currentStatus);
            axios
                .put(`/api/articles/${article.id}/bookmark`)
                .then(({ data }) => {
                    setIsBookmarked(data.data.bookmarked);
                })
                .catch(() => {
                    setIsBookmarked(currentStatus);
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
        <div className="rounded-lg bg-white shadow-md">
            {article.banner_url &&
                (article.metadata?.display_banner_in_listing ?? true) && (
                    <Link
                        href={route("user.article", {
                            user: article.user.username,
                            article: article.slug,
                        })}
                    >
                        <img
                            className=" rounded-t-lg max-w-full w-full h-auto"
                            src={article.banner_url}
                            alt={article.title}
                        />
                    </Link>
                )}
            <div className="p-1">
                <div className="flex items-center justify-between">
                    <Link href={route("user", { user: article.user.username })}>
                        <div className="flex items-center hover:underline">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={
                                    article.user?.avatar_url ??
                                    "/images/avatars/placeholder.png"
                                }
                                alt={article.user.name}
                            />
                            <div className="ml-2">
                                <p className="antialiased text-sm font-semibold">
                                    {article.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {moment(article.published_at)
                                        .locale(i18n.language)
                                        .format("LLL")}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                {/* title */}
                <Link
                    href={route("user.article", {
                        user: article.user.username,
                        article: article.slug,
                    })}
                >
                    <h2 className="text-2xl px-3 antialiased font-semibold mt-2 hover:underline">
                        {article.title}
                    </h2>
                </Link>
                {/* tags */}
                <div className="flex space-x-2 px-3 mt-2">
                    {article.tags
                        .sort((a, b) => a.slug.localeCompare(b.slug))
                        .map((tag) => {
                            const hash = tag.slug
                                .split("")
                                .reduce((acc, char) => {
                                    return (
                                        char.charCodeAt(0) + ((acc << 5) - acc)
                                    );
                                }, 0);

                            const color = `#${((hash & 0x00ffffff) | 0x1000000)
                                .toString(16)
                                .substring(1)}`;

                            return (
                                <span
                                    key={tag.id}
                                    onClick={() => {
                                        setText("");
                                        visit(
                                            route("search", { tags: tag.slug })
                                        );
                                    }}
                                    className="text-sm hover:underline cursor-pointer bg-gray-100 rounded-lg px-2 py-1"
                                >
                                   <span
                                     style={{
                                        color: color,
                                    }}
                                    >#</span>
                                    
                                    {tag.slug}
                                </span>
                            );
                        })}
                </div>
                <div className="flex justify-between">
                    <Link
                        href={route("user.article", {
                            user: article.user.username,
                            article: article.slug,
                        })}
                    >
                        <div className="flex items-center hover:bg-gray-100 transition duration-300 hover:rounded-md mt-2 pr-4">
                            {article.reactions_count > 0 && (
                                <div className="p-1 space-x-2 flex items-center">
                                    <GroupedReactions
                                        fontSize="lg"
                                        compressed={true}
                                        groupedReactions={article.reactions}
                                    />
                                    <div className="text-sm text-gray-500">
                                        {article.reactions_count}{" "}
                                        {article.reactions_count == 1
                                            ? t("reaction")
                                            : t("reactions")}
                                    </div>
                                </div>
                            )}
                            {article.comments_count > 0 && (
                                <div className="p-1  space-x-3 flex items-center">
                                    <div className="text-sm text-gray-500">
                                        <Fa icon="comment" className="mr-1" />
                                        {article.comments_count}{" "}
                                        {article.comments_count == 1
                                            ? t("comment")
                                            : t("comments")}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                    <div className="flex items-center pr-4 space-x-3">
                        <span className="text-sm text-gray-500">
                            {article.reading_time} {t("min read")}
                        </span>
                        <Bookmark
                            bookmarked={isBookmarked}
                            onClick={toggleBookmark}
                            size="sm"
                            className={
                                "px-1 transition-all " +
                                (isBookmarked
                                    ? " text-red-600"
                                    : "text-black hover:text-red-300")
                            }
                        />
                    </div>
                </div>
                {/* mind read and bookmark */}
            </div>
        </div>
    );
};

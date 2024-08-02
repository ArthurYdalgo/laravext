import Bookmark from "@/components/Bookmark";
import Tooltip from "@/components/Tooltip";
import { nexusProps, sharedProps } from "@laravext/react";
import { visit } from "@laravext/react/router";
import useStateRef from "react-usestateref";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Article from "@/components/Article/Article";
import Dropdown from "@/components/Dropdown";
import ThreeDots from "@/components/Icons/ThreeDots";
import DropdownButton from "@/components/DropdownButton";
import CopyToClipboard from "@/components/CopyToClipboard";
import Fa from "@/components/Fa";

export default () => {
    const { article } = nexusProps();
    const { t } = useTranslation();
    const { user } = sharedProps().auth;

    const [bookmarked, setBookmarked] = useStateRef(
        article.user_has_bookmarked
    );

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
        <div className="flex ">
            <div className="hidden sm:block sm:w-[5.5%] lg:w-[5.5%] px-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="transition inline-flex items-center px-2 py-2 hover:bg-gray-200 rounded-full ">
                            <ThreeDots />
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="left">
                        <DropdownButton>
                            <span className="flex justify-between">{t("Copy Shareable Link")} <Fa icon="copy" className="mt-0.5"/></span>
                        </DropdownButton>
                        <div className="border-b border-gray-200 w-full"></div>
                        <DropdownButton>
                            {t("Report Abuse")}
                        </DropdownButton>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="sm:w-[65.5%] lg:w-[65.5%] rounded-md bg-white">
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
                <span className="flex mt-2 justify-between">
                    <div></div>
                    <div>
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
                </span>
            </div>
            <div className="sm:w-[29%] lg:w-[29%] px-3"></div>
        </div>
    );
};

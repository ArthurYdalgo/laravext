import Fa from "@/components/Fa";
import BookmarkDrawer from "@/components/Icons/BookmarkDrawer";
import Cog from "@/components/Icons/Cog";
import Home from "@/components/Icons/Home";
import Tag from "@/components/Icons/Tag";
import Link from "@/components/Link";
import { sharedProps } from "@laravext/react";
import { useTranslation } from "react-i18next";

export default ({ children, ...props }) => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    return (
        <div {...props}>
            <div className="flex flex-col space-y-2">
                <Link routeName={"home"} className="flex row">
                    <Home className="mr-1" />
                    {t("Home")}
                </Link>
                <Link routeName={"tags"} className="flex row">
                    <Tag className="mr-1" />
                    {t("Tags")}
                </Link>
                {user && (
                    <Link routeName={"bookmarks"} className="flex row">
                        <BookmarkDrawer className="mr-1" />
                        {t("Bookmarks")}
                    </Link>
                )}
            </div>
            {user && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("Your Tags")}
                        </span>
                        <Cog />
                    </div>
                    {user.tags?.length == 0 ? (
                        <span className="text-sm text-gray-500">
                            {t("You do not follow any tags yet")}
                        </span>
                    ) : (
                    <div className="flex flex-col space-y-2">
                        {user.tags.sort((a, b) => a.slug.localeCompare(b.slug)).map((tag) => (
                            <Link
                                key={tag.id}
                                routeName={"search"}
                                params={{ tags: tag.slug }}
                                className="flex row hover:underline cursor-pointer"
                            >
                                <span className="bg-white rounded-lg px-2 py-1 text-sm">#{tag.slug}</span>
                            </Link>
                        ))}
                    </div>)}
                </div>
            )}
            <div className="flex row mt-6">
                <a
                    href={"https://youtube.com/@laravext"}
                    target="_blank"
                    className="mr-1"
                >
                    <Fa icon="fa-brands fa-youtube" className="ml-0.5 mr-1" />
                </a>
                <a
                    href="https://dsc.gg/laravext"
                    target="_blank"
                    className="mr-1"
                >
                    <Fa icon="fa-brands fa-discord" className="ml-0.5 mr-1" />
                </a>
                <a
                    href="https://github.com/ArthurYdalgo/laravext/tree/main/examples/laravel-11-react"
                    target="_blank"
                    className="mr-1"
                >
                    <Fa icon="fa-brands fa-github" className="ml-0.5 mr-1" />
                </a>
            </div>
        </div>
    );
};

import Fa from "@/components/Fa";
import BookmarkDrawer from "@/components/Icons/BookmarkDrawer";
import Cog from "@/components/Icons/Cog";
import Home from "@/components/Icons/Home";
import Tag from "@/components/Icons/Tag";
import Link from "@/components/Link";
import useSearch from "@/hooks/useSearch";
import { sharedProps } from "@laravext/react";
import { useTranslation } from "react-i18next";
import { route } from "ziggy-js";
import { visit } from "@laravext/react/router";
import { useEffect, useState } from "react";
import { add } from "lodash";
import { tagHexColor } from "@/tools/helpers";

export default ({ children, ...props }) => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();
    const { addTag, removeTag, tags } = useSearch();

    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        axios.get("/api/tags").then((response) => {
            setAvailableTags(response.data.data);
        });
    }, []);

    return (
        <div {...props}>
            
                {tags.length > 0 && (
                    <div className="">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("Search Tags")}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {tags.map((tag) => {
                            const color = tagHexColor(tag);

                            return (
                                <div key={`search_tag_${tag}`} className="" >
                                    <span className="bg-white cursor-pointer rounded-lg px-2 py-1 text-sm"
                                    onClick={() => {
                                        removeTag(tag);
                                    }}
                                    >
                                        <span className="text-sm">
                                            <span style={{ color: color }}>
                                                #
                                            </span>
                                            {tag}</span>
                                        <span
                                            className="ml-1 "
                                            
                                        >
                                            <Fa icon="times" />
                                        </span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                )}
            
            {user && (
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("Your Tags")}
                        </span>
                        <Link
                            routeName={"dashboard.following.tags"}
                            className="flex row hover:bg-gray-300 rounded-full p-[5px] transition duration-300"
                        >
                            <Cog />
                        </Link>
                    </div>
                    {user.tags?.length == 0 ? (
                        <span className="text-sm text-gray-500">
                            {t("You do not follow any tags yet")}
                        </span>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            {user.tags
                                // .sort((a, b) => a.slug.localeCompare(b.slug))
                                .map((tag) => {
                                    const color = tagHexColor(tag);

                                    return (
                                        <div key={`user_tags_${tag.slug}`}>
                                            <span
                                                onClick={() => {
                                                    addTag(tag.slug);
                                                }}
                                                className={"bg-white hover:underline cursor-pointer rounded-lg px-2 py-1 text-sm " + (tags.includes(tag.slug) ? "bg-gray-200" : "")}
                                            >
                                                <span
                                                    style={{
                                                        color: color,
                                                    }}
                                                >
                                                    #
                                                </span>
                                                {tag.slug}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            )}
            {
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("All Tags")}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {availableTags.map((tag) => {
                            const color = tagHexColor(tag);

                            return (
                                <div key={`user_tags_${tag.slug}`}>
                                    <span
                                        onClick={() => {
                                            addTag(tag.slug);
                                        }}
                                        className={"bg-white hover:underline cursor-pointer rounded-lg px-2 py-1 text-sm " + (tags.includes(tag.slug) ? "bg-gray-200" : "")}
                                    >
                                        <span
                                            style={{
                                                color: color,
                                            }}
                                        >
                                            #
                                        </span>
                                        {tag.slug}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
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

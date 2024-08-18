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
import useAllTags from "@/hooks/useAllTags";

export default ({ children, ...props }) => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();
    const { addTag, removeTag, tags: searchTags } = useSearch();
    const {
        setTags: setAllTags,
        tags: allTags,
        loaded: tagsLoaded,
        setLoaded: setTagsLoaded,
    } = useAllTags();

    const [loadingAllTags, setLoadingAllTags] = useState(false);

    useEffect(() => {
        if (!tagsLoaded) {
            setLoadingAllTags(true);
            axios.get("/api/tags").then((response) => {
                setAllTags(response.data.data);
                setTagsLoaded(true);
                setLoadingAllTags(false);
            });
        }
    }, []);

    return (
        <div {...props}>
            {searchTags.length > 0 && (
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("Search Tags")}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {searchTags.map((tag) => {
                            const color = tagHexColor(tag);

                            return (
                                <div key={`search_tag_${tag}`} className="">
                                    <span
                                        className="bg-white cursor-pointer rounded-lg px-2 py-1 text-sm"
                                        onClick={() => {
                                            removeTag(tag);
                                        }}
                                    >
                                        <span className="text-sm">
                                            <span style={{ color: color }}>
                                                #
                                            </span>
                                            {tag}
                                        </span>
                                        <span className="ml-1 ">
                                            <Fa icon="times" />
                                        </span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {loadingAllTags && (
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("All Tags")}
                        </span>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="flex flex-col space-y-2 mini-loader"></div>
                    </div>
                </div>
            )}
            {!loadingAllTags && (
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">
                            {t("All Tags")}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {allTags.map((tag) => {
                            const color = tagHexColor(tag);
                            return (
                                <div key={`user_tags_${tag.slug}`}>
                                    <span
                                        onClick={() => {
                                            addTag(tag.slug);
                                        }}
                                        className={
                                            "bg-white hover:underline cursor-pointer rounded-lg px-2 py-1 text-sm " +
                                            (searchTags.includes(tag.slug)
                                                ? "opacity-50"
                                                : "")
                                        }
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
                    href="https://x.com/laravext_dev"
                    target="_blank"
                    className="mr-1"
                >
                    <Fa icon="fa-brands fa-x-twitter" className="ml-0.5 mr-1" />
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

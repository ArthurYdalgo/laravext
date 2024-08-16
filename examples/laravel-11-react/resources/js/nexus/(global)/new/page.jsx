import {
    BlockTypeSelect,
    ButtonWithTooltip,
    CodeToggle,
    CreateLink,
    DiffSourceToggleWrapper,
    headingsPlugin,
    InsertCodeBlock,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    Separator,
    StrikeThroughSupSubToggles,
} from "@mdxeditor/editor";
import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    listsPlugin,
    quotePlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    tablePlugin,
    thematicBreakPlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    markdownShortcutPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Fa from "@/components/Fa";
import Swal from "sweetalert2";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "axios";
import Loading from "@/components/Loading";
import Article from "@/components/Article/Article";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import DangerButton from "@/components/DangerButton";
import useAllTags from "@/hooks/useAllTags";
import { tagHexColor } from "@/tools/helpers";
export default () => {
    const { t } = useTranslation();

    const markdownRef = useRef();

    const [mode, setMode] = useState("edit");
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [htmlPreview, setHtmlPreview] = useState("");
    const [imageIsUploading, setImageIsUploading] = useState(false);
    const [banner, setBanner] = useState(null);

    const {
        setTags: setAllTags,
        tags: allTags,
        loaded: tagsLoaded,
        setLoaded: setTagsLoaded,
    } = useAllTags();

    const [tags, setTags] = useState([]);

    const addTag = (tag) => {
        if (!tags.includes(tag.slug)) {
            setTags([...tags, tag]);
        }
    };

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t.slug != tag.slug));
    };

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

    const imageUploadHandler = async (image) => {
        setImageIsUploading(true);
        const formData = new FormData();
        formData.append("image", image);
        // send the file to your server and return
        // the URL of the uploaded image in the response
        const response = await axios.post("/api/images", formData);
        setImageIsUploading(false);
        return response.data.data.url;
    };

    const submitArticle = (e) => {
        e.preventDefault();

        // get the form data
        const formData = new FormData(e.target);

        // append the markdown content
        formData.append("markdown", markdown);

        // append the banner
        if (banner) {
            formData.append("banner", banner);
        }

        // append the tags
        formData.append("tags", tags.map((tag) => tag.id));


        // send the form data to the server
        axios
            .post("/api/articles", formData)
            .then(() => {
                Swal.fire({
                    title: t("Article saved successfully"),
                    icon: "success",
                    confirmButtonText: t("OK"),
                });
            })
            .catch(() => {
                Swal.fire({
                    title: t(
                        "An error occurred while trying to save the article"
                    ),
                    icon: "error",
                    confirmButtonText: t("OK"),
                });
            });
    };

    const [markdown, setMarkdown] = useState(`# Hello Word

        ## **Awesome Subtitle**

        This is where you can start writing your new article

        You can use code blocks like this:

        \`\`\`js
        export default () => {
            console.log('foo');
            return <div>Awesome</div>
        }
        \`\`\`

        Or you can use inline code like this: \`const awesome = true\`


        Separators like this:

        ***

        You can have a tables:


        | Some   | Really  | Cool  |
        | ------ | ------- | ----- |
        | Values | In      | You   |
        | Really | Awesome | Table |


        And insert images (they'll be centered in the final output) like this:

        ![placeholder](https://via.placeholder.com/150)
    `);

    return (
        <div className="p-2 bg-white rounded-lg shadow-lg">
            <div>
                <h1 className="text-2xl font-bold">{t("New Article")}</h1>
            </div>
            <form onSubmit={submitArticle}>
                <div className="mb-2">
                    <InputLabel>
                        {t("Banner")} ({t("optional")})
                    </InputLabel>

                    {/* primary button that acts as input for a file */}
                    <div className="flex space-x-2 mb-2">
                        <PrimaryButton
                            as="label"
                            htmlFor="banner"
                            type="button"
                            className="cursor-pointer"
                            onClick={() => {
                                // simulate click on the file input
                                document.getElementById("banner").click();
                            }}
                        >
                            {t("Submit Image")}
                        </PrimaryButton>
                        {banner && (
                            <DangerButton
                                type="button"
                                onClick={() => {
                                    setBanner(null);
                                }}
                            >
                                <Fa icon="trash" className="mr-2" />
                                {t("Remove")}
                            </DangerButton>
                        )}
                    </div>
                    <input
                        type="file"
                        id="banner"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            setBanner(e.target.files[0]);
                        }}
                    />
                    {/* some feedback that it was uploaded */}
                    {banner && (
                        <>
                            <div className="flex items-center justify-center">
                                <img
                                    src={URL.createObjectURL(banner)}
                                    alt="banner"
                                    className="w-[70%]"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="mb-2">
                    <InputLabel>{t("Title")}</InputLabel>
                    <TextInput
                        label={t("Title")}
                        placeholder={t("The Title of This Incredible Article")}
                        className="w-full"
                        name="title"
                    />
                </div>

                <div className="mb-2">
                    <InputLabel>{t("Language")}</InputLabel>
                    <select
                        name="language"
                        className="w-full border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">{t("Select a language")}</option>
                        <option value="en">{t('English')}</option>
                        <option value="pt">{t('Portuguese')}</option>
                    </select>
                </div>

                <div className="mb-2">
                    <InputLabel>{t("Reading time in minutes")}</InputLabel>
                    <input 
                        type="number" 
                        name="reading_time" 
                        className="w-full border border-gray-300 rounded-lg"
                        required
                        min={1}
                    />
                </div>

                <hr className="my-4" />

                <div className="mb-2">
                    <InputLabel>{t("Content")}</InputLabel>
                </div>
                <div className="mb-2 flex justify-between">
                    <PrimaryButton
                        disabled={mode == "edit"}
                        onClick={() => {
                            setMode("edit");
                            setHtmlPreview("");
                        }}
                    >
                        {t("Edit")}
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={mode == "preview"}
                        onClick={() => {
                            setLoadingPreview(true);
                            setMode("preview");

                            axios
                                .post("/api/tools/markdown-preview", {
                                    markdown,
                                })
                                .then(({ data }) => {
                                    setHtmlPreview(data.data.html);
                                    setLoadingPreview(false);
                                })
                                .catch(() => {
                                    setLoadingPreview(false);
                                    Swal.fire({
                                        title: t(
                                            "An error occurred while trying to preview the markdown"
                                        ),
                                        icon: "error",
                                        confirmButtonText: t("OK"),
                                    });
                                });
                        }}
                    >
                        {t("Preview")}
                    </PrimaryButton>
                </div>
                <div className=" border-2 bg-gray-100 border-black min-h-[500px] rounded-lg">
                    {mode == "preview" && loadingPreview && <Loading />}
                    {mode == "preview" && !loadingPreview && (
                        <div className="article pre-wrap break-words">
                            {typeof window == "undefined" && (
                                <div
                                    className="server-side-rendered-article"
                                    dangerouslySetInnerHTML={{
                                        __html: htmlPreview,
                                    }}
                                ></div>
                            )}
                            {typeof window != "undefined" && (
                                <Article html={htmlPreview} />
                            )}
                        </div>
                    )}
                    {mode == "edit" && (
                        <MDXEditor
                            translation={(
                                key,
                                defaultValue,
                                interpolations
                            ) => {
                                return i18n.t(
                                    key,
                                    defaultValue,
                                    interpolations
                                );
                            }}
                            ref={markdownRef}
                            markdown={markdown}
                            onChange={(newMarkdown) => {
                                setMarkdown(newMarkdown);
                            }}
                            plugins={[
                                toolbarPlugin({
                                    toolbarContents: () => {
                                        return (
                                            <>
                                                <UndoRedo />
                                                <Separator />
                                                <BoldItalicUnderlineToggles />
                                                <CodeToggle />
                                                <Separator />
                                                <StrikeThroughSupSubToggles />
                                                <Separator />
                                                <ListsToggle />
                                                <Separator />
                                                <BlockTypeSelect />
                                                <Separator />
                                                <CreateLink />
                                                <InsertImage />
                                                <Separator />
                                                <InsertTable />
                                                <InsertThematicBreak />
                                                <Separator />
                                                <InsertCodeBlock />
                                                <Separator />
                                                <ButtonWithTooltip
                                                    className="cursor-pointer"
                                                    title={t("Clear")}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: t(
                                                                "Are you sure you want to clear the editor?"
                                                            ),
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonText:
                                                                t("Yes"),
                                                            cancelButtonText:
                                                                t("No"),
                                                        }).then(
                                                            ({
                                                                isConfirmed,
                                                            }) => {
                                                                if (
                                                                    isConfirmed
                                                                ) {
                                                                    Swal.fire({
                                                                        title: t(
                                                                            "Are you absolutely sure?"
                                                                        ),
                                                                        icon: "warning",
                                                                        showCancelButton: true,
                                                                        confirmButtonText:
                                                                            t(
                                                                                "Yes"
                                                                            ),
                                                                        cancelButtonText:
                                                                            t(
                                                                                "No"
                                                                            ),
                                                                    }).then(
                                                                        ({
                                                                            isConfirmed,
                                                                        }) => {
                                                                            if (
                                                                                isConfirmed
                                                                            ) {
                                                                                markdownRef.current?.setMarkdown(
                                                                                    ""
                                                                                );
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <Fa icon="trash" />
                                                </ButtonWithTooltip>
                                                <DiffSourceToggleWrapper />
                                            </>
                                        );
                                    },
                                }),
                                listsPlugin(),
                                quotePlugin(),
                                headingsPlugin(),
                                linkPlugin(),
                                linkDialogPlugin(),
                                imagePlugin(),
                                tablePlugin(),
                                thematicBreakPlugin(),
                                codeBlockPlugin({
                                    defaultCodeBlockLanguage: "",
                                }),
                                codeMirrorPlugin({
                                    codeBlockLanguages: {
                                        js: "JavaScript",
                                        css: "CSS",
                                        txt: "Plain Text",
                                        tsx: "TypeScript",
                                        php: "PHP",
                                        "": "Unspecified",
                                    },
                                }),
                                diffSourcePlugin({
                                    viewMode: "rich-text",
                                    diffMarkdown: "boo",
                                }),
                                markdownShortcutPlugin(),
                                imagePlugin({ imageUploadHandler }),
                            ]}
                        />
                    )}
                </div>

                <hr className="my-4" />

                
                    <div className="mt-2 flex">
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">
                                    {t("Selected Tags")}
                                </span>
                            </div>

                            <div className="flex space-x-2 h-8">
                                {tags.map((tag) => {
                                    const color = tagHexColor(tag);
                                    return (
                                        <div
                                            key={`search_tag_${tag.slug}`}
                                            className=""
                                        >
                                            <span
                                                className="bg-gray-200 cursor-pointer rounded-lg px-2 py-1 text-sm"
                                                onClick={() => {
                                                    removeTag(tag);
                                                }}
                                            >
                                                <span className="text-sm">
                                                    <span
                                                        style={{ color: color }}
                                                    >
                                                        #
                                                    </span>
                                                    {tag.slug}
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
                    </div>
                
                <div className="mt-2 flex">
                    {allTags.length > 0 && (
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold">
                                    {t("Available Tags")}. {t('You can choose up to 5 tags')}
                                </span>
                            </div>

                            <div className="grid grid-cols-8 gap-2">
                                {allTags
                                    .filter((tag) => {
                                        // filter out tags that are already selected
                                        return !tags.find(
                                            (t) => t.slug == tag.slug
                                        );
                                    })
                                    .map((tag) => {
                                        const color = tagHexColor(tag);
                                        return (
                                            <div
                                                key={`search_tag_${tag.slug}`}
                                                className=""
                                            >
                                                <span
                                                    className={"bg-gray-200 rounded-lg px-2 py-1 text-sm " + (tags.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer')}
                                                    onClick={() => {
                                                        if (tags.length >= 5) {
                                                            
                                                            return;
                                                        }
                                                        addTag(tag);
                                                    }}
                                                >
                                                    <span className="text-sm">
                                                        <span
                                                            style={{
                                                                color: color,
                                                            }}
                                                        >
                                                            #
                                                        </span>
                                                        {tag.slug}
                                                    </span>
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-2 flex justify-end">
                    <PrimaryButton disabled={imageIsUploading}>
                        {t("Save")}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

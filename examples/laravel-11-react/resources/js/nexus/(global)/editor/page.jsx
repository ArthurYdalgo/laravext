import { BlockTypeSelect, ButtonWithTooltip, CodeToggle, CreateLink, DiffSourceToggleWrapper, headingsPlugin, InsertCodeBlock, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, Separator, StrikeThroughSupSubToggles } from '@mdxeditor/editor'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, listsPlugin, quotePlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, thematicBreakPlugin, codeBlockPlugin, codeMirrorPlugin, diffSourcePlugin, markdownShortcutPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Fa from '@/components/Fa';
import Swal from 'sweetalert2';
import PrimaryButton from '@/components/PrimaryButton';
import axios from 'axios';
import Loading from '@/components/Loading';
import Article from '@/components/Article';
export default () => {

    const { t } = useTranslation();

    const markdownRef = useRef();

    const [mode, setMode] = useState('edit');
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [htmlPreview, setHtmlPreview] = useState('');
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
        <div className='p-2 bg-white rounded-lg shadow-lg'>
            <div className='mb-2 flex justify-between'>
                <PrimaryButton disabled={mode == 'edit'} onClick={() => {
                    setMode('edit')
                    setHtmlPreview('');
                }}>{t('Edit')}</PrimaryButton>
                <PrimaryButton disabled={mode == 'preview'} onClick={() => {
                    setLoadingPreview(true);
                    setMode('preview');

                    axios.post('/api/tools/markdown-preview', { markdown }).then(({ data }) => {
                        setHtmlPreview(data.html);
                        setLoadingPreview(false);
                    }).catch(() => {
                        setLoadingPreview(false);
                        Swal.fire({
                            title: t('An error occurred while trying to preview the markdown'),
                            icon: 'error',
                            confirmButtonText: t('OK')
                        });


                    });
                }}>{t('Preview')}</PrimaryButton>

            </div>
            <div className=' border-2 bg-gray-100 border-black min-h-[500px] rounded-lg'>
                {mode == 'preview' && loadingPreview && <Loading />}
                {mode == 'preview' && !loadingPreview &&
                    <div className="article pre-wrap break-words">
                    {typeof window == 'undefined' && <div className="server-side-rendered-article" dangerouslySetInnerHTML={{ __html: htmlPreview }}></div>}
                    {typeof window != 'undefined' && <Article html={htmlPreview} />}
                </div>
                }
                {mode == 'edit' && <MDXEditor

                    translation={(key, defaultValue, interpolations) => {
                        return i18n.t(key, defaultValue, interpolations);
                    }}
                    ref={markdownRef}
                    markdown={markdown}
                    onChange={(newMarkdown) => {
                        setMarkdown(newMarkdown)
                    }
                    }

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
                                        <ButtonWithTooltip className='cursor-pointer' title={t('Clear')} onClick={() => {
                                            Swal.fire({
                                                title: t('Are you sure you want to clear the editor?'),
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: t('Yes'),
                                                cancelButtonText: t('No')
                                            }).then(({ isConfirmed }) => {
                                                if (isConfirmed) {
                                                    Swal.fire({
                                                        title: t('Are you absolutely sure?'),
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonText: t('Yes'),
                                                        cancelButtonText: t('No')
                                                    }).then(({ isConfirmed }) => {
                                                        if (isConfirmed) {
                                                            markdownRef.current?.setMarkdown('');
                                                        }
                                                    });
                                                }
                                            });
                                        }}><Fa icon='trash' /></ButtonWithTooltip>
                                        <DiffSourceToggleWrapper />
                                    </>
                                );
                            }
                        }),
                        listsPlugin(),
                        quotePlugin(),
                        headingsPlugin(),
                        linkPlugin(),
                        linkDialogPlugin(),
                        imagePlugin(),
                        tablePlugin(),
                        thematicBreakPlugin(),
                        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
                        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', 'php': 'PHP', '': 'Unspecified' } }),
                        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
                        markdownShortcutPlugin()
                    ]}
                />}
            </div>
        </div>
    );
}
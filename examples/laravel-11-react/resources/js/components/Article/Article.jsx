import { useTranslation } from "react-i18next";
import Fa from "@/components/Fa";
import FadingShadowText from "@/components/FadingShadowText";
import { useState } from "react";
import CryptoJS from 'crypto-js';

export default ({ html }) => {

    if (typeof window === 'undefined') {
        return <div className="server-side-rendered-article" dangerouslySetInnerHTML={{ __html: html }}></div>
    }

    const { t } = useTranslation();
    const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const childrenArray = Array.from(doc.body.children);

    const generateMD5Hash = (input) => {
        return CryptoJS.MD5(input).toString();
    };

    return (<div className="article-div">{childrenArray.map((child, elementIndex) => {
        if (child.tagName !== 'PRE') {
            return <div dangerouslySetInnerHTML={{ __html: child.outerHTML }} key={generateMD5Hash(`${elementIndex})_not_pre`)}></div>;
        }

        let preChildren = Array.from(child.children);

        return (<pre key={generateMD5Hash(`${elementIndex})_pre`)}>{preChildren.map((preChild, preChildrenIndex) => {

            if (preChild.tagName !== 'CODE') {
                return <div dangerouslySetInnerHTML={{ __html: preChild.outerHTML }} key={generateMD5Hash(`${elementIndex}_${preChildrenIndex}_not_code`)}></div>;
            }

            return (<div key={generateMD5Hash(`${elementIndex}_${preChildrenIndex}_code`)} className="relative">
                <span className="bg-white text-black p-[7px] rounded-md absolute top-2 right-4 font-semibold font-sans cursor-pointer" onClick={() => {
                    let decodedCode = document.createElement('textarea');
                    decodedCode.innerHTML = preChild.innerHTML;
                    let code = decodedCode.value;
                    decodedCode.remove();

                    navigator.clipboard.writeText(code).then(() => {
                        setCopiedCodeIndex(preChildrenIndex);
                        setTimeout(() => {
                            setCopiedCodeIndex(null);
                        }, 700);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                }
                }><FadingShadowText trigger={copiedCodeIndex == preChildrenIndex}>
                        {t('Copy')}</FadingShadowText></span>
                <div className="copy-paste-div-code">

                    <code dangerouslySetInnerHTML={{ __html: preChild.innerHTML }}>

                    </code>
                </div></div>);
        })}</pre>);
    })}</div>);
}
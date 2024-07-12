import Bookmark from '@/components/Bookmark';
import Tooltip from '@/components/Tooltip';
import { nexusProps, sharedProps } from '@laravext/react';
import { visit } from '@laravext/react/router';
import useStateRef from 'react-usestateref';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const addCopyButtons = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let codeBlocks = doc.querySelectorAll('pre > code');
    
    for(let codeBlock of codeBlocks){
        let button = document.createElement('button');
        button.innerText = 'Copy';
        button.className = 'copy-button';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.padding = '5px';
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });

        const pre = codeBlock.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
    }

    return doc.body.innerHTML;
};

export default () => {
    const { article } = nexusProps();
    const { t } = useTranslation();
    const { user } = sharedProps().auth;

    const [bookmarked, setBookmarked] = useStateRef(article.user_has_bookmarked);

    const toggleBookmark = () => {
        if (user) {
            let currentStatus = bookmarked;
            setBookmarked(!currentStatus);
            axios.put(`/api/articles/${article.id}/bookmark`).then(({ data }) => {
                setBookmarked(data.bookmarked);
            }).catch(() => {
                setBookmarked(currentStatus);
            });

            return;
        }

        Swal.fire({
            title: t('You must be logged in to bookmark articles'),
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: t('Login'),
            cancelButtonText: t('Cancel')
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                visit(route('login'));
            }
        });
    }

    return (<div>
        <p align='center'>
            <img src={article.banner_url} width={'600px'} alt={article.title} />
        </p>
        <span className='flex justify-between'><h1>{article.title}</h1>
            <Tooltip text={bookmarked ? t('Click to unbookmark this article') : t('Click to bookmark this article')}>
                <Bookmark bookmarked={bookmarked} onClick={toggleBookmark} className={'transition-all  rounded-md ' + (bookmarked ? ' bg-slate-200 text-red-600' : 'text-black hover:text-red-300')} />
            </Tooltip>
        </span>

        <div className="article pre-wrap break-words">
            <div dangerouslySetInnerHTML={{ __html: addCopyButtons(article.html) }}></div>
        </div>

    </div>
    );
}
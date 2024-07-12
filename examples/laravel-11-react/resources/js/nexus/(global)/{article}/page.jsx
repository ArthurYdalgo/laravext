import Bookmark from '@/components/Bookmark';
import Tooltip from '@/components/Tooltip';
import { nexusProps, sharedProps } from '@laravext/react';
import { visit } from '@laravext/react/router';
import useStateRef from 'react-usestateref';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import Article from '@/components/Article';

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
                console.log("fuck");
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
            <img src={article.banner_url} className='shadow-md max-w-[800px]' alt={article.title} />
        </p>

        <h1>{article.title}</h1>


        <div className="article pre-wrap break-words">
            {/* <Article html={article.html} /> */}
        </div>
        <hr className='my-4' />
        <span className='flex mt-2 justify-between'>
            <div>

            </div>
            <div>
                <Tooltip text={bookmarked ? t('Click to unbookmark this article') : t('Click to bookmark this article')}>
                    <Bookmark bookmarked={bookmarked} onClick={toggleBookmark} className={'transition-all  rounded-md ' + (bookmarked ? ' bg-slate-200 text-red-600' : 'text-black hover:text-red-300')} />
                </Tooltip>
            </div>
        </span>
    </div>
    );
}
import moment from 'moment/min/moment-with-locales';
import {visit} from '@laravext/react/router';
import GroupedReactions from './GroupedReactions';

export default ({ article }) => {
    return (
        <div className="rounded-lg bg-white">
            {(article.metadata?.display_banner_in_listing ?? true) && (
                <img
                    className=" rounded-t-lg max-w-full h-auto"
                    src={article.banner_url}
                    alt={article.title}
                />
            )}
            <div className="p-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={article.user?.avatar_url ?? "/images/avatars/placeholder.png"}
                            alt={article.user.name}
                        />
                        <div className="ml-2">
                            <p className="antialiased text-sm font-semibold">
                                {article.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {moment(article.published_at).format('LL')} ({moment(article.published_at).fromNow()})
                            </p>
                        </div>
                    </div>
                </div>
                {/* title */}
                <h2 className="text-2xl px-3 antialiased font-semibold mt-2">{article.title}</h2>
                {/* tags */}
                <div className="flex space-x-2 px-3 mt-2">
                    {article.tags.map((tag) => (
                        <span key={tag.id} onClick={() => {
                            visit(route('search', {tags: tag.slug}));
                        }} className="text-xs hover:underline cursor-pointer bg-gray-100 rounded-lg px-2 py-1">
                            #{tag.slug}
                        </span>
                    ))}
                </div>
                <div className="p-2">
                    {article.reactions_count}
                    <GroupedReactions fontSize='lg' compressed={true} groupedReactions={article.reactions} />
                </div>
                {/* reactions and comments */}
                {/* mind read and bookmark */}
            </div>
        </div>
    );
};

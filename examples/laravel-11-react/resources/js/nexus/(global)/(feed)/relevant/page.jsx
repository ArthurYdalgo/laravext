import ArticleListing from "@/components/Article/ArticleListing";

export default () => {
    return <ArticleListing queryParams={{
        'filter': {
            'relevance': true
        }
    }} />
};

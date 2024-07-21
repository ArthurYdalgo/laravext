import ArticleListing from "@/components/Article/ArticleListing";

export default () => {
    return <ArticleListing queryParams={{
        'sort': '-published_at'
    }} />
};

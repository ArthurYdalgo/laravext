import ArticleListing from "@/components/Article/ArticleListing";

export default () => {
    return <ArticleListing queryParams={{
        'sort' : '-top_infinity'
    }} />
};

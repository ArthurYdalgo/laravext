import ArticleCard from "@/components/Article/ArticleCard";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash-es";
import useStateRef from "react-usestateref";
import { Head } from "@laravext/react";
import useSearch from "@/hooks/useSearch";

export default ({queryParams = {}}) => {
    const { t } = useTranslation();
    const { text } = useSearch();

    const [pagination, setPagination, paginationRef] = useStateRef({
        data: [],
        meta: {},
        loading: true,
        page: 1,
        per_page: 10,
    });

    const [filters, setFilters, filtersRef] = useStateRef({
        search: text,
    });

    useEffect(() => {
        setFilters((prevState) => ({ ...prevState, search: text }));
        console.log("text", text);
        debouncedFetchResources();
    }, [text]);

    const fetchResources = () => {
        setPagination((prevState) => ({ ...prevState, loading: true }));

        let params = {
            page: paginationRef.current.page,
            per_page: paginationRef.current.per_page,
            filter: {
                search: filtersRef.current.search ?? '',
            },
            include: "user,commentsCount,tags,reactionsCount",
        };

        if (queryParams) {
            params = {...params, ...queryParams};
        }

        axios
            .get("/api/articles", {
                params
            })
            .then((response) => {
                setPagination((prevState) => ({
                    ...prevState,
                    data: response.data.data,
                    meta: response.data.meta,
                    loading: false,
                }));
            })
            .catch((error) => {
                console.error(error);
                setPagination((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    /**
     * If you're wondering why we're using `useCallback` here, here's a good explanation:
     * 
     * @see: https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
     */
    const debouncedFetchResources = useCallback(debounce(fetchResources, 500), []);

    return (
        <>
            <Head title={t("Articles")} />

            <div className="space-y-3">
                {pagination.data.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {/* {!pagination.loading && (
                <Pagination onPaginateTo={paginateTo} pagination={pagination} />
            )} */}
        </>
    );
};

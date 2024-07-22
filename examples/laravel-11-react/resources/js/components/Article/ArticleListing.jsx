import ArticleCard from "@/components/Article/ArticleCard";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash-es";
import useStateRef from "react-usestateref";
import { Head } from "@laravext/react";
import useSearch from "@/hooks/useSearch";
import Loading from "../Loading";
import PrimaryButton from "../PrimaryButton";

export default ({ queryParams = {} }) => {
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
        setPagination((prevState) => ({ ...prevState, page: 1 }));
        debouncedFetchResources();
    }, [text]);

    const paginateTo = ({ page, perPage, clearData = true }) => {
        setPagination((prevState) => ({
            ...prevState,
            page,
            per_page: perPage,
        }));
        fetchResources(clearData);
    };

    const fetchResources = (clearData = true) => {
        setPagination((prevState) => ({ ...prevState, loading: true }));

        let params = {
            page: paginationRef.current.page,
            per_page: paginationRef.current.per_page,
            filter: {
                search: filtersRef.current.search ?? "",
            },
            include: "user,commentsCount,tags,reactionsCount",
        };

        if (queryParams) {
            params = { ...params, ...queryParams };
        }

        axios
            .get("/api/articles", {
                params,
            })
            .then((response) => {
                setPagination((prevState) => ({
                    ...prevState,
                    data: clearData ? response.data.data : [...prevState.data, ...response.data.data],
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
    const debouncedFetchResources = useCallback(
        debounce(fetchResources, 500),
        []
    );

    return (
        <>
            <div className="space-y-3">
                {pagination.data.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                <Loading condition={pagination.loading} />
            </div>
            <div className="flex justify-center mt-4">
                {!pagination.loading &&
                    pagination.meta?.current_page <
                        pagination.meta?.last_page && (
                        <PrimaryButton
                            onClick={() => {
                                paginateTo({
                                    page: pagination.page + 1,
                                    perPage: pagination.per_page,
                                    clearData: false,
                                });
                            }}
                        >
                            {t("Load More")}
                        </PrimaryButton>
                    )}
                {pagination.meta?.current_page >=
                    pagination.meta?.last_page && (
                    <span className="text-gray-500 text-md">
                        {t("No more articles to load")}
                    </span>
                )}
            </div>
        </>
    );
};

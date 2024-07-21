import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import useStateRef from "react-usestateref";
import { Head } from "@laravext/react";

export default () => {
    const { t } = useTranslation();

    const [pagination, setPagination, paginationRef] = useStateRef({
        data: [],
        meta: {},
        loading: true,
        page: 1,
        per_page: 10,
    });

    const [filters, setFilters, filtersRef] = useStateRef({
        search: "",
    });

    const debouncedFetchResources = debounce(() => {
        pagination.page = 1;

        fetchResources();
    }, 1000);

    useEffect(() => {
        fetchResources();
    }, []);

    const paginateTo = ({ page, perPage }) => {
        setPagination((prevState) => ({
            ...prevState,
            page,
            per_page: perPage,
        }));
        fetchResources();
    };

    const fetchResources = () => {
        setPagination((prevState) => ({ ...prevState, loading: true }));

        axios
            .get("/api/articles", {
                params: {
                    page: paginationRef.current.page,
                    per_page: paginationRef.current.per_page,
                    search: filtersRef.current.search ?? "",
                    include: "user,commentsCount,tags,reactionsCount",
                },
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
    return (
        <>
            <Head>{t("Projects")}</Head>
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

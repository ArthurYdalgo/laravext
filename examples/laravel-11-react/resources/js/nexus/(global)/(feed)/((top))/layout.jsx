import FeedLayout from "@/components/Article/Feed/FeedLayout";
import Link from "@/components/Link";
import Layout from "../layout";
import { useTranslation } from "react-i18next";

export default ({ children }) => {

    const { t } = useTranslation();

    return (
        <Layout
            topPageButtons={
                <>
                    <Link
                        routeName={"top.week"}
                        className="m-2 mt-0 py-[8px] px-[12px] text-base hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        {t('week')}
                    </Link>
                    <Link
                        routeName={"top.month"}
                        className="m-2 mt-0 py-[8px] px-[12px] text-base hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        {t('month')}
                    </Link>
                    <Link
                        routeName={"top.year"}
                        className="m-2 mt-0 py-[8px] px-[12px] text-base hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        {t('year')}
                    </Link>
                    <Link
                        routeName={"top.infinity"}
                        className="m-2 mt-0 py-[8px] px-[12px] text-base hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        {t('infinity')}
                    </Link>
                </>
            }
        >
            {children}
        </Layout>
    );
};

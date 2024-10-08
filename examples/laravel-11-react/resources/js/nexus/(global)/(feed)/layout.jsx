import FeedLayout from "@/components/Article/Feed/FeedLayout";
import Link from "@/components/Link";
import { currentRouteIs } from "@/tools/helpers";
import { sharedProps } from "@laravext/react";
import { useTranslation } from "react-i18next";

export default ({ children, topPageButtons = null }) => {
    const { user } = sharedProps().auth;
    const { t } = useTranslation();

    return (
        <FeedLayout>
            <div className="space-y-1">
                <div className="flex row space-x-1 text-lg ">
                    <Link
                        routeName={"home"}
                        className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-bold"
                    >
                        {t("Latest")}
                    </Link>
                    <Link
                        routeName={"top.week"}
                        className={
                            "m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg " +
                            (currentRouteIs([
                                "top.week",
                                "top.month",
                                "top.year",
                                "top.infinity",
                            ])
                                ? "font-bold"
                                : "")
                        }
                    >
                        {t("Top")}
                    </Link>
                    {user && (
                        <>
                            <Link
                                routeName={"relevant"}
                                className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                                classNameWhenIsCurrentRoute="font-bold"
                            >
                                {t("Relevant")}
                            </Link>
                            <Link
                                routeName={"bookmarks"}
                                className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                                classNameWhenIsCurrentRoute="font-bold"
                            >
                                {t("Bookmarks")}
                            </Link>
                        </>
                    )}
                </div>
                {/* horizontal line */}
                {topPageButtons ? (
                    <>
                        <div className="border-b border-gray-200 "></div>
                        <div className="flex row space-x-2 text-lg ">
                            {topPageButtons}
                        </div>
                    </>
                ) : null}
            </div>
            {children}
        </FeedLayout>
    );
};

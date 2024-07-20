import FeedLayout from "@/components/Feed/FeedLayout";
import Link from "@/components/Link";
import Layout from "../layout";

export default ({ children }) => {
    return (
        <Layout
            topPageButtons={
                <>
                    <Link
                        routeName={"top.week"}
                        className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        week
                    </Link>
                    <Link
                        routeName={"top.month"}
                        className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        month
                    </Link>
                    <Link
                        routeName={"top.year"}
                        className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        year
                    </Link>
                    <Link
                        routeName={"top.infinity"}
                        className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                        classNameWhenIsCurrentRoute="font-black"
                    >
                        infinity
                    </Link>
                </>
            }
        >
            {children}
        </Layout>
    );
};

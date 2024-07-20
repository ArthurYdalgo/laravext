import FeedLayout from "@/components/Feed/FeedLayout";
import Link from "@/components/Link";

export default ({ children, topPageButtons = null }) => {
    return (
        <div>
            <FeedLayout>
                <div className="flex justify-between">
                    <div className="flex row space-x-1 text-lg ">
                        <Link
                            routeName={"home"}
                            className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                            classNameWhenIsCurrentRoute="font-black"
                        >
                            Relevant
                        </Link>
                        <Link
                            routeName={"latest"}
                            className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                            classNameWhenIsCurrentRoute="font-black"
                        >
                            Latest
                        </Link>
                        <Link
                            routeName={"top.week"}
                            className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg"
                            classNameWhenIsCurrentRoute="font-black"
                        >
                            Top
                        </Link>
                    </div>
                    {topPageButtons ? (
                        <div className="flex row space-x-2 text-lg ">
                            {topPageButtons}
                        </div>
                    ) : null}
                </div>
                {children}
            </FeedLayout>
        </div>
    );
};

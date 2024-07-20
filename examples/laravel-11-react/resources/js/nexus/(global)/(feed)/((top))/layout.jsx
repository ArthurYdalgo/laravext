import FeedLayout from "@/components/Feed/FeedLayout"
import Link from "@/components/Link"

export default ({children}) => {
    return (
        <div>
            <FeedLayout>
                <div className="flex justify-between">
                    <div className="flex row space-x-4 text-lg ">
                        <Link routeName={'home'} className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg" classNameWhenIsCurrentRoute='font-black'>
                            Relevant
                        </Link>
                        <Link routeName={'latest'} className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg" classNameWhenIsCurrentRoute="font-black">
                            Latest
                        </Link>
                        <Link routeName={'top.week'} className="m-2 mt-0 py-[8px] px-[12px] hover:text-blue-700 hover:bg-white hover:rounded-lg" classNameWhenIsCurrentRoute="font-black">
                            Top
                        </Link>
                    </div>
                    <div className="flex row space-x-2 text-lg ">
                        <Link routeName={'top.week'} className="hover:text-blue-700" classNameWhenIsCurrentRoute="font-black">
                            week
                        </Link>
                        <Link routeName={'top.month'} className="hover:text-blue-700" classNameWhenIsCurrentRoute="font-black">
                            month
                        </Link>
                        <Link routeName={'top.year'} className="hover:text-blue-700" classNameWhenIsCurrentRoute="font-black">
                            year
                        </Link>
                        <Link routeName={'top.infinity'} className="hover:text-blue-700" classNameWhenIsCurrentRoute="font-black">
                            all
                        </Link>

                    </div>
                </div>
                {children}
            </FeedLayout>
        </div>
    )
}
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"

export default ({children, ...props}) => {

    // proportions of 0.75/3.85 for the left side bar and 1/4 for the right side bar and 2/4 for the feed layout
    return <div {...props} className="flex">
        <LeftSideBar className="hidden sm:block w-2/12 px-3" />

        <div className="feed-layout w-7/12 px-3">
            {children}
        </div>

        <RightSideBar className="hidden sm:block w-3/12 px-3" />
    </div>
}
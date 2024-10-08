import LeftSideBar from "./LeftSideBar"

export default ({children, ...props}) => {

    // proportions of 0.75/3.85 for the left side bar and 1/4 for the right side bar and 2/4 for the feed layout
    return <div {...props} className="flex lg:px-20">
        <LeftSideBar className="hidden sm:block sm:w-3/12 lg:w-3/12  px-3" />

        <div className="px-1 sm:w-9/12 lg:w-9/12 lg:px-2">
            {children}
        </div>
    </div>
}
export default ({ laravext, children }) => {
    return (<div> Parent Layout
        <div className="container">
            {children}
        </div>
    </div>)
}
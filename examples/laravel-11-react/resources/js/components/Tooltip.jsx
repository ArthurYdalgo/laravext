import { Tooltip } from "react-tooltip";

export default ({ text = null, children , condition = true }) => {
    if (!text || !condition) {
        return children;
    }

    let randomId = Math.random().toString(36).substring(7);

    return (<>
        <div data-tooltip-id={randomId} data-tooltip-content={text}>
            {children}
        </div>
        <Tooltip id={randomId} />
    </>);
};

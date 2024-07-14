import Fa from "./Fa";

export default ({bookmarked = false, onClick = () => {}, size = 'lg', ...props}) => {
    return (<button onClick={onClick} {...props}>
        <Fa size={size} icon={bookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} />
    </button>);
}
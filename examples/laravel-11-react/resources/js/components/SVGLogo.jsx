export default ({className = '', icon, ...props}) => {
    return (
        <img src={icon} className={className} {...props} />
    )
}
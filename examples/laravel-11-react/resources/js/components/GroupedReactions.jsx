export default ({ groupedReactions, compressed = false, fontSize = "sm" }) => {
    const emojis = {
        "sparkle-heart": "💖",
        unicorn: "🦄",
        "exploding-head": "🤯",
        "raised-hands": "🙌",
        fire: "🔥",
    };

    const fontSizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
    };

    if (compressed) {
        // Grouped reactions are sorted by count in descending order, withing circles, and the one on the left slightly obscures the one on the right.
        // This is a compressed version of the GroupedReactions component.
        return (
                <div className="relative flex items-center">
                    {groupedReactions.map((reaction, index) => (
                        <div
                            key={index}
                            className="absolute flex items-center justify-center transition-all"
                            style={{
                                left: `${index * 25}px`,
                                zIndex: groupedReactions.length - index,
                            }}
                        >
                            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border-gray-400 border">
                                <span>{emojis[reaction.reaction]}</span>
                            </div>
                            <span className="absolute bottom-[-6px] right-[-3px] px-2 py-1 text-[8px] text-white bg-red-500 rounded-full">
                                {reaction.count}
                            </span>
                        </div>
                    ))}
                </div>
        );
    }
    return (
        <div className="flex items-center space-x-3">
            {groupedReactions.map((reaction) => {
                return (
                    <div
                        key={reaction.id}
                        className="flex items-center space-x-1"
                    >
                        <span className={fontSizes[fontSize] ?? "text-sm"}>
                            {emojis[reaction.reaction]}
                        </span>
                        <span
                            className={
                                "font-bold " +
                                (fontSizes[fontSize] ?? "text-sm")
                            }
                        >
                            {reaction.count}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

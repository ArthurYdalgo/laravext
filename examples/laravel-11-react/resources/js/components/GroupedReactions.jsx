export default ({ groupedReactions, compressed = false, fontSize = "sm", includeMissingReactions = false }) => {
    const emojis = {
        "sparkle-heart": "💖",
        unicorn: "🦄",
        "exploding-head": "🤯",
        "raised-hands": "🙌",
        fire: "🔥",
    };

    const missingReactions = Object.keys(emojis).filter(
        (reaction) =>
            !groupedReactions.find((groupedReaction) => groupedReaction.reaction === reaction)
    ).map((reaction) => ({ reaction, count: 0 }));

    const fontSizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
    };

    if (compressed) {
        return (
            <div className="flex items-center">
                {groupedReactions.map((reaction, index) => (
                    <div
                        key={reaction.reaction}
                        className={`flex items-center relative justify-center transition-all ${index !== 0 ? '-ml-4' : ''}`}
                        style={{
                            zIndex: groupedReactions.length - index,
                            left: `${index * 1}px`,
                        }}
                    >
                        <div className="flex items-center justify-center w-8 h-8 pt-1 text-sm bg-white rounded-full shadow-md border-gray-400 border">
                            <span>{emojis[reaction.reaction]}</span>
                        </div>
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
                        key={reaction.reaction}
                        className="flex items-center space-x-1"
                    >
                        <span className={fontSizes[fontSize] ?? "text-sm"}>
                            {emojis[reaction.reaction]}</span>
                        <span className={
                                "" +
                                (fontSizes[fontSize] ?? "text-sm")
                            }
                        >
                            {reaction.count}
                        </span>
                    </div>
                );
            })}

            {includeMissingReactions ? missingReactions.map((reaction) => (
                <div
                    key={reaction.reaction}
                    className="flex items-center space-x-1"
                >
                    <span className={fontSizes[fontSize] ?? "text-sm"}>
                        {emojis[reaction.reaction]}
                    </span>
                    <span className={
                            "" +
                            (fontSizes[fontSize] ?? "text-sm")
                        }
                    >
                        {reaction.count}
                    </span>
                </div>
            )) : null}
            

        </div>
    );
};

// FacebookReactionsComponent.jsx
import {
    ReactionBarSelector,
} from "@charkour/react-reactions";
import React, { useState, useRef, useEffect } from "react";
import Fa from "../Fa";
import { useNonInitialEffect } from "@/tools/useNonInitialEffect";

export default ({
    closeOnReactionClick = true,
    outerDivClassName = "",
    buttonClassName = "",
    iconClassName = "",
    reactionComponentDivClassName = "",
    onReact = (reation) => {},
    reactionsCount = 0,
    displayReactionsCount = true,
    highlightKeys = ["unicorn", "exploding-head"],
}) => {

    const defaultReactions = [
        { node: <>💖</>, key: "sparkle-heart" },
        { node: <>🦄</>, key: "unicorn" },
        { node: <>🤯</>, key: "exploding-head" },
        { node: <>🙌</>, key: "raised-hands" },
        { node: <>🔥</>, key: "fire" },
    ]

    
    const computedReactions = () => {
        return defaultReactions.map((reaction) => {
            return {
                ...reaction,
                node: (
                    <div className="rounded-full px-2" style={highlightKeys?.includes(reaction.key) ? {backgroundColor: "#aaaaaa22"} : {}}>
                        {reaction.node}
                    </div>
                ),
            };
        });
    };
    
    const reactions = computedReactions();
    
    const [showReactions, setShowReactions] = useState(false);

    const containerRef = useRef(null);

    const toggleReactions = () => {
        setShowReactions(!showReactions);
    };

    const handleReactionClick = (reaction) => {
        if (closeOnReactionClick) {
            setShowReactions(false);
        }

        onReact(reaction);
    };

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setShowReactions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={"relative inline-block " + outerDivClassName}
        >
            <div className="flex flex-col">
                <button
                    onClick={toggleReactions}
                    className={
                        "transition rounded-full px-[9px] py-[10px] " +
                        (showReactions
                            ? "bg-gray-300 "
                            : "hover:bg-gray-200 ") +
                        buttonClassName
                    }
                >
                    <div className="flex items-center">
                        <Fa
                            icon="heart-circle-plus"
                            size="lg"
                            className={iconClassName}
                        />
                    </div>
                </button>
                <div className="flex justify-center">
                    {displayReactionsCount ? reactionsCount : null}
                </div>
            </div>
            {showReactions && (
                <div
                    
                    className={
                        "absolute transition mt-2 mb-2 pt-2 transform -translate-x-1 flex space-x-2 reactions-bar-selector " +
                        reactionComponentDivClassName
                    }
                >
                    <ReactionBarSelector
                        reactions={reactions}
                        onSelect={handleReactionClick}
                    />
                </div>
            )}
        </div>
    );
};

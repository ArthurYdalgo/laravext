// FacebookReactionsComponent.jsx
import {
    FacebookSelector,
    ReactionBarSelector,
} from "@charkour/react-reactions";
import React, { useState, useRef, useEffect } from "react";
import Fa from "../Fa";
const reactions = [
    { node: <>💖</>, key: "sparkle-heart" },
    { node: <>🦄</>, key: "unicorn" },
    { node: <>🤯</>, key: "exploding-head" },
    { node: <>🙌</>, key: "raised-hands" },
    { node: <>🔥</>, key: "fire" },
];

export default ({closeOnReactionClick = true, outerDivClassName = '', buttonClassName = '', iconClassName = '' , reactionComponentDivClassName = '', onSelection = (reation) => {}}) => {
    const [showReactions, setShowReactions] = useState(false);
    
    const containerRef = useRef(null);

    const toggleReactions = () => {
        setShowReactions(!showReactions);
    };

    const handleReactionClick = (reaction) => {
        if(closeOnReactionClick){
            setShowReactions(false);
        }

        onSelection(reaction);
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
        <div ref={containerRef} className={"relative inline-block " + outerDivClassName}>
            <button
                onClick={toggleReactions}
                className={"transition rounded-full p-[10px] " + (showReactions ? "bg-gray-300 " : "hover:bg-gray-200 ") + buttonClassName}
            >
                <Fa icon="heart-circle-plus" size="lg"   className={iconClassName}/>
            </button>
            {showReactions && (
                <div className={"absolute transition mt-2 mb-2 pt-2 transform -translate-x-1 flex space-x-2 reactions-bar-selector " + reactionComponentDivClassName}>
                    <ReactionBarSelector
                        reactions={reactions}
                        onSelect={handleReactionClick}
                    />
                </div>
            )}
        </div>
    );
};
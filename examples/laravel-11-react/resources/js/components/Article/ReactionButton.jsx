// FacebookReactionsComponent.jsx
import { FacebookSelector, ReactionBarSelector } from '@charkour/react-reactions';
import React, { useState, useRef, useEffect } from 'react';

import 'tailwindcss/tailwind.css';

// const emojis = {
//     "sparkle-heart": "💖",
//     unicorn: "🦄",
//     "exploding-head": "🤯",
//     "raised-hands": "🙌",
//     fire: "🔥",
// };

const reactions = [
    { label: 'Love',node: <>💖</>, key: "sparkle-heart"},
    { label: 'Unicorn', node: <>🦄</>, key: "unicorn"},
    { label: 'Amazing', node: <>🤯</>, key: "exploding-head"},
    { label: 'Raised-Hands', node: <>🙌</>, key: "raised-hands"},
    { label: 'Fire', node: <>🔥</>, key: "fire"},
];

const FacebookReactionsComponent = () => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const containerRef = useRef(null);

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  const handleReactionClick = (reaction) => {
    console.log(reaction);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowReactions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={toggleReactions}
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        {selectedReaction ? selectedReaction.emoji : 'React'}
      </button>
      {showReactions && (
        <div
          className="absolute mb-2 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2"
        >
          <ReactionBarSelector reactions={reactions} onSelect={handleReactionClick} />
        </div>
      )}
    </div>
  );
};

export default FacebookReactionsComponent;

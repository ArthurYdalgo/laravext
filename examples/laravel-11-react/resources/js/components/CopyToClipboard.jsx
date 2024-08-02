import { useState } from 'react';
import Fa from './Fa';

function CopyToClipboard({ content, children, icon, iconSize = 5, truncateAt = null , ...props}) {
  const [isClicked, setIsClicked] = useState(false);

  function handleCopy() {
    setIsClicked(true);
    navigator.clipboard?.writeText(content);
    setTimeout(() => {
      setIsClicked(false);
    }, 700);
  }

  let truncatedContent = content;
  if (truncateAt != null && truncateAt < content.length) {
    const leftLength = Math.floor((truncateAt - 3) / 2);
    const rightLength = Math.ceil((truncateAt - 3) / 2);
    truncatedContent = content.substring(0, leftLength) + '...' + content.substring(content.length - rightLength);
  }

  const textStyle = isClicked ? {
    animation: `fade 900ms`,
    textShadow: '0 0 10px rgba(0,167,0,1)'
  } : {};

  return (
    <div className="flex items-center">
      <button onClick={handleCopy} style={textStyle}>
        {children ? children : truncatedContent}
        {icon ?? <Fa icon="copy" size={iconSize} className="ml-2" />}
      </button>
    </div>
  );
}

export default CopyToClipboard;

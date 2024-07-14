import React, { useState, useEffect } from 'react';

function FadingShadowText({ children, trigger, timeout = 700, ...props }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, timeout);
    }
  }, [trigger]);

  const textStyle = isClicked ? {
    animation: `fade-shadow ${timeout + 200}ms`,
    textShadow: '0 0 10px rgba(0,0,167,1)'
  } : {};

  return (
    <span style={textStyle} {...props}>
      {children}
    </span>
  );
}

export default FadingShadowText;

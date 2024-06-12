import React from 'react';
const LoaderComponent = ({ condition = true }) => {
  return (
    <>
      {condition && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
export default LoaderComponent;
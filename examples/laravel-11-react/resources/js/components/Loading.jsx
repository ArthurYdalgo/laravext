export default ({ condition = true }) => {
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

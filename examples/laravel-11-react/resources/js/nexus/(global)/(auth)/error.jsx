import ErrorBoundary from "@/components/ErrorBoundary";


export default ({ children, onError }) => {
  const doSomething = () => {
    // window.location.reload();
  };

  return (
    <ErrorBoundary onError={doSomething} fallback={<span>Something went wrong... Oopsie daisy</span>}>
      {children}
    </ErrorBoundary>
  );
}
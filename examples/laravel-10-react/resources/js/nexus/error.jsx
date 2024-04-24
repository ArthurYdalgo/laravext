import ErrorBoundary from "@/components/ErrorBoundary"

export default ({ laravext, children }) => {

    const doSomething = async () => {
        window.location.reload();
    }

    return (
        <ErrorBoundary onError={doSomething} fallback={<div>Something went wrong... Oopsie daisy</div>}>
            {children}
        </ErrorBoundary>
    )
}
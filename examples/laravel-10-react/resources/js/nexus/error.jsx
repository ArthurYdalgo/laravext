import ErrorBoundary from "@/components/ErrorBoundary"
// import { ErrorBoundary } from "react-error-boundary";


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
import { useState, useEffect } from "react"

export default ({ laravext, children }) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (loading ? <div>
        Loading Client Side
    </div> : <div>
        Terminou o loading Client Side
        <>
            {children}
        </>
    </div>)
}
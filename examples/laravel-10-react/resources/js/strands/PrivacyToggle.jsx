import usePrivacy from '@/hooks/usePrivacy'
import { useEffect } from 'react'

export default ({ laravext }) => {
    const { active, setActive, toggle } = usePrivacy();
    console.log('laravext', laravext);
    useEffect(() => {
        console.log('initialState', laravext.initialState);
        setActive(laravext.initialState);
    }, [laravext]);

    return (
        <>
            <span className="cursor-pointer" onClick={toggle}>{active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On'}</span>
        </>
    )
}
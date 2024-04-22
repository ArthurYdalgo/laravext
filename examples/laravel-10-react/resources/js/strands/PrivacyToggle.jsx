import usePrivacy from '@/hooks/usePrivacy'
import axios from 'axios';
import { useEffect } from 'react'

export default ({ laravext, initialState }) => {
    const { active, setActive, toggle } = usePrivacy();
    
    useEffect(() => {
        if(initialState !== undefined){
            setActive(initialState);
        }
    }, [initialState]);

    const handleToggle = () => {
        // This is done like this because the active wouldn't always be updated immediately
        let currentState = active;
        toggle();
        axios.put('/api/auth/user/privacy', { privacy: !currentState })
    }

    return (
        <>
            <span className="cursor-pointer" onClick={handleToggle}>{active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On'}</span>
        </>
    )
}
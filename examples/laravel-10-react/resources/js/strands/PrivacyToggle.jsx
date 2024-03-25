import usePrivacy from '@/hooks/usePrivacy'

export default ({laravext}) => {
    const { active, toggle } = usePrivacy();

    return (
        <>
            <span className="cursor-pointer"  onClick={toggle}>{active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On'}</span>
        </>

    )
}
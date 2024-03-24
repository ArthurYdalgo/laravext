import usePrivacy from '@/hooks/usePrivacy'


export default ({laravext}) => {
    const { active, toggle } = usePrivacy();

    return (
        <>
            <span className="text-white cursor-pointer"  onClick={toggle}>{active ? 'Ativado' : 'Desativado'}</span>
        </>

    )
}
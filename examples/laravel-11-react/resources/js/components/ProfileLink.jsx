import Fa from "./Fa";

export default ({ link }) => {
    const { type, href, display_mode = 'link' } = link;

    return <a href={href} className="hover:text-blue-500">
        {display_mode === 'icon' && <Fa icon={`fa-${type}` + (type != 'link' ? ' fa-brands' : '')} />}
        {display_mode === 'link' && (<><Fa className="mr-2" icon={`fa-${type}` + (type != 'link' ? ' fa-brands' : '')} />{href}</>)}
        {display_mode === 'short_link' && (<><Fa className="mr-2" icon={`fa-${type}` + (type != 'link' ? ' fa-brands' : '')} />{href.replace(/^https?:\/\//, '')}</>)}
    </a>;
};

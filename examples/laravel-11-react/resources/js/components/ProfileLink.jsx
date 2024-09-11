import Fa from "./Fa";

export default ({ link }) => {
    const { type, url, icon} = link;

    return <a href={url} target="_blank" className="hover:text-blue-500 cursor:pointer">
        {type === 'icon' && <Fa icon={`fa-${icon} fa-brands`} size='xl'  />}
        {type === 'short_link' && (<><Fa className="mr-2" icon={`link`} />{href.replace(/^https?:\/\//, '')}</>)}
    </a>;
};

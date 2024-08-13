import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash, faEye, faEyeSlash, faCopy,faComment,faLocationDot,faSuitcase, faGraduationCap, faBirthdayCake, faHashtag, faNewspaper, faCheckCircle, faSearch, faClock, faBookmark as faSolidBookmark, faLink, faHeartCirclePlus, faShareAlt, faFlag, faHeart, faCommentMedical, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faRegularBookmark} from '@fortawesome/free-regular-svg-icons'
import { faDiscord, faGithub, faYoutube, faXTwitter, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Add all solid icons to the library so they can be used
library.add(faPlus, faTrash, faEye, faEyeSlash,faCopy, faShareAlt, faXTwitter,faCommentMedical,faEdit, faFlag,faHeart, faLinkedin, faTwitter, faHeartCirclePlus, faLink,faFacebook, faYoutube,faDiscord,faGraduationCap,faSuitcase,faLocationDot,faBirthdayCake, faGithub,faNewspaper, faHashtag, faComment, faCheckCircle, faClock, faSearch, faSolidBookmark, faRegularBookmark )

export default function Fa({ icon, className='', size = '1x', ...props }) {
  return <FontAwesomeIcon className={className} size={size} icon={icon} {...props} />;
}

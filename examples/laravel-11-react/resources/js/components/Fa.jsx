import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash, faEye, faEyeSlash, faCopy,faComment,  faCheckCircle, faSearch, faClock, faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faRegularBookmark} from '@fortawesome/free-regular-svg-icons'
import { faDiscord, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'

// Add all solid icons to the library so they can be used
library.add(faPlus, faTrash, faEye, faEyeSlash,faCopy, faYoutube,faDiscord,faGithub, faComment, faCheckCircle, faClock, faSearch, faSolidBookmark, faRegularBookmark )

export default function Fa({ icon, className='', size = '1x', ...props }) {
  return <FontAwesomeIcon className={className} size={size} icon={icon} {...props} />;
}

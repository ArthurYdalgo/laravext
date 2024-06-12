import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEye, faEyeSlash, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'

// Add all solid icons to the library so they can be used
library.add(faPlus, faTrash, faEye, faEyeSlash, faCheckCircle, faClock )

export default function Fa({ icon, className='', size = '1x', ...props }) {
  return <FontAwesomeIcon className={className} size={size} icon={icon} {...props} />;
}

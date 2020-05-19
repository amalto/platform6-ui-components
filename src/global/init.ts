import { library } from '@fortawesome/fontawesome-svg-core'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'


export default function() {
    initializeIcons();
}

function initializeIcons() {
    library.add(faHamburger)
}

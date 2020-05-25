import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


export default function() {
    initializeIcons();
}

function initializeIcons() {
    library.add(fas.faHamburger, fas.faHome)
}

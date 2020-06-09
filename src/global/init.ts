import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faHamburger,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

function initializeIcons(): void {
  library.add(faAngleDown, faHamburger, faHome, faQuestionCircle, faFolderOpen);
}

export default function (): void {
  initializeIcons();
}

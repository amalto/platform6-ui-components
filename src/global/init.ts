import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faHamburger,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

function initializeIcons(): void {
  library.add(faAngleDown, faHamburger, faHome, faQuestionCircle);
}

export default function (): void {
  initializeIcons();
}

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHamburger,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

function initializeIcons(): void {
  library.add(faHamburger, faHome, faQuestionCircle);
}

export default function (): void {
  initializeIcons();
}

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

function initializeIcons(): void {
  library.add(fas.faHamburger, fas.faHome);
}

export default function (): void {
  initializeIcons();
}

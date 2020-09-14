import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faAngleDown,
  faChevronLeft,
  faChevronRight,
  faEraser,
  faEye,
  faEyeSlash,
  faHamburger,
  faHome,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faMinus,
  faPalette,
  faPlus,
  faPlusCircle,
  faQuestionCircle,
  faSearch,
  faSort,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { version } from '../../package.json';
import { setAppVersion } from '../utils/cache';

function initializeIcons(): void {
  library.add(
    faAngleDown,
    faHamburger,
    faHome,
    faQuestionCircle,
    faFolderOpen,
    faTrash,
    faPlusCircle,

    faChevronLeft,
    faChevronRight,
    faSort,
    faTrashAlt,
    faMinus,
    faPlus,
    faAlignLeft,
    faAlignRight,
    faAlignCenter,
    faPalette,

    faLongArrowAltUp,
    faLongArrowAltDown,

    faEraser,
    faEye,
    faEyeSlash,
    faFolderOpen,
    faSearch,
  );
}

export default function main(): void {
  initializeIcons();
}

setAppVersion(version);

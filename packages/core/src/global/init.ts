import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faAngleDown,
  faAngleUp,
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faEraser,
  faEye,
  faEyeSlash,
  faHamburger,
  faHome,
  faICursor,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faMinus,
  faPalette,
  faPencilAlt,
  faPlay,
  faPlus,
  faPlusCircle,
  faQuestionCircle,
  faSearch,
  faSearchPlus,
  faSort,
  faStop,
  faSyncAlt,
  faTrash,
  faTrashAlt,
  faUndoAlt,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { version } from '../../package.json';
import { setAppVersion } from '../utils/cache';

function initializeIcons(): void {
  library.add(
    faAlignLeft,
    faAlignRight,
    faAlignCenter,
    faAngleDown,
    faAngleUp,
    faCheckSquare,
    faChevronLeft,
    faChevronRight,
    faCopy,
    faDownload,
    faEraser,
    faEye,
    faEyeSlash,
    faFolderOpen,
    faHamburger,
    faHome,
    faICursor,
    faLongArrowAltUp,
    faLongArrowAltDown,
    faMinus,
    faPalette,
    faPencilAlt,
    faPlay,
    faPlus,
    faPlusCircle,
    faQuestionCircle,
    faSearch,
    faSearchPlus,
    faSort,
    faStop,
    faSyncAlt,
    faTrash,
    faTrashAlt,
    faUndoAlt,
    faUpload,
  );
}

export default function main(): void {
  initializeIcons();
}

setAppVersion(version);

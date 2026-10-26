// Direct per-icon imports: importing from '@hugeicons/core-free-icons' index
// loads all 6000+ icons and hits Metro's EMFILE limit. Direct files keep
// the bundle small and the build reliable.
//
// NOTE: Do NOT add '.js' to these paths. This package's exports map already
// resolves the bare name to the .js file, so 'Home01Icon.js' becomes
// 'Home01Icon.js.js' and Metro prints invalid package.json warnings.
import Home01Icon from '@hugeicons/core-free-icons/dist/esm/Home01Icon';
import Hotel01Icon from '@hugeicons/core-free-icons/dist/esm/Hotel01Icon';
import HandPrayerIcon from '@hugeicons/core-free-icons/dist/esm/HandPrayerIcon';
import Compass01Icon from '@hugeicons/core-free-icons/dist/esm/Compass01Icon';
import GroupIcon from '@hugeicons/core-free-icons/dist/esm/GroupIcon';
import Kaaba01Icon from '@hugeicons/core-free-icons/dist/esm/Kaaba01Icon';
import MapsGlobal01Icon from '@hugeicons/core-free-icons/dist/esm/MapsGlobal01Icon';
import BookOpen01Icon from '@hugeicons/core-free-icons/dist/esm/BookOpen01Icon';
import Airplane01Icon from '@hugeicons/core-free-icons/dist/esm/Airplane01Icon';
import Wallet01Icon from '@hugeicons/core-free-icons/dist/esm/Wallet01Icon';

export {
  Home01Icon,
  Hotel01Icon,
  HandPrayerIcon,
  Compass01Icon,
  GroupIcon,
  Kaaba01Icon,
  MapsGlobal01Icon,
  BookOpen01Icon,
  Airplane01Icon,
  Wallet01Icon,
};

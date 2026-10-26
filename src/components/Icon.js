import { HugeiconsIcon } from '@hugeicons/react-native';

export default function Icon({ icon, size = 22, color = '#0B3D2E', strokeWidth = 1.8 }) {
  return <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={strokeWidth} />;
}

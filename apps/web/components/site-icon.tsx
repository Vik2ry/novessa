import type { LucideProps } from "lucide-react";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  FileBadge2,
  Gauge,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wallet
} from "lucide-react";

const iconMap = {
  "shield-check": ShieldCheck,
  wallet: Wallet,
  gauge: Gauge,
  hand: HandHeart,
  heart: HeartHandshake,
  mail: Mail,
  map: MapPin,
  "file-badge": FileBadge2,
  bank: Banknote,
  globe: Globe2,
  education: GraduationCap,
  health: Stethoscope,
  partnership: BriefcaseBusiness,
  building: Building2,
  trust: BadgeCheck,
  support: Landmark,
  sparkles: Sparkles
} as const;

export function SiteIcon({ name, ...props }: { name: keyof typeof iconMap } & LucideProps) {
  const Icon = iconMap[name] ?? ShieldCheck;
  return <Icon {...props} />;
}

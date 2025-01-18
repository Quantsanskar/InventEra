import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function Navigation() {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Join Us", url: "#", icon: User },
    { name: "Nights", url: "#", icon: Briefcase },
    { name: "Contact", url: "#", icon: FileText },
  ];

  return <NavBar items={navItems} />;
}

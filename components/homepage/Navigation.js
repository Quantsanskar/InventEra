import { Home, User, Briefcase, FileText, Eclipse, Handshake, Phone } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", url: "/", icon: Home, active: pathname === "/" },
    { name: "Nights", url: "/thenights", icon: Eclipse, active: pathname === "/thenights" },
    { name: "Contact", url: "/contactPage/contact", icon: Phone, active: pathname === "/contact" },
    { name: "Dashboard", url: "/Dashboard", icon: User, active: pathname === "/Dashboard" },
  ];

  return <NavBar items={navItems} />;
}

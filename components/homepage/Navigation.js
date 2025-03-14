import { Home, User, Briefcase, FileText, Eclipse, Handshake, Phone , Video} from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", url: "/", icon: Home, active: pathname === "/" },
    { name: "Nights", url: "/thenights", icon: Eclipse, active: pathname === "/thenights" },
    { name: "Dashboard", url: "/Dashboard", icon: User, active: pathname === "/Dashboard" },
    { name: "Contact", url: "/contactPage/contact", icon: Phone, active: pathname === "/contact" },
    // { name: "S1 Demos", url: "/demoday", icon: Video, active: pathname === "/demoday" },
  ];

  return <NavBar items={navItems} />;
}

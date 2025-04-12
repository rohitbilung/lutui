import { useState } from "react";
import { clsx } from "clsx";
import { Menu, LayoutDashboard, Users, Settings, User } from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["admin", "editor", "viewer"],
  },
  {
    label: "Users",
    icon: Users,
    path: "/users",
    roles: ["admin"],
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    roles: ["admin", "editor"],
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
    roles: ["admin", "editor", "viewer"],
  },
];

const NavBar = ({ userRole = "viewer" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredNav = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Toggle Button */}
      <div className="bg-[#440505] md:hidden p-2 z-50 relative text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" title="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-[#440505] shadow-lg z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-4 text-xl font-bold border-b">
          <img src="/logo.png" className="object-cover h-10" />
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {filteredNav.map(({ label, icon: Icon, path }, index) => (
            <a
              key={index}
              href={path}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 text-white transition"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;

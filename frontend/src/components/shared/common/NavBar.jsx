import { useState, forwardRef } from "react";
import { clsx } from "clsx";
import { Menu, LayoutDashboard, Users, Settings, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

const NavBar = forwardRef(({ userRole = "admin" }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredNav = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  const NavList = ({ onClose = () => {} }) => {
    return (
      <>
        <div className="p-4 text-xl font-bold border-b flex justify-between items-center">
          <img src="/logo.png" className="object-cover h-10" />
          <span
            className="text-white text-right text-xl p-2 inline md:hidden cursor-pointer"
            title="Close Menu"
            onClick={onClose}
          >
            <X />
          </span>
        </div>

        <nav className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100vh-80px)]">
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
      </>
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="md:hidden text-[#440505] absolute left-2 top-2">
        {/* <div className="bg-[#440505] md:hidden p-2 z-50 relative text-white"> */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="bg-[#440505] [&>button]:hidden">
          <SheetDescription className="py-0 px-2">
            <NavList onClose={() => setIsOpen(!isOpen)} />
          </SheetDescription>
        </SheetContent>
      </Sheet>

      {/* Sidebar */}
      <aside
        ref={ref}
        className={clsx(
          "fixed hidden md:block top-0 left-0 h-full w-64 bg-[#440505] shadow-lg z-50 transform transition-transform duration-300 md:translate-x-0"
        )}
      >
        <NavList />
      </aside>
    </>
  );
});

export default NavBar;

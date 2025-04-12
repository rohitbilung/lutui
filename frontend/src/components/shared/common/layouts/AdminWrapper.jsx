import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // from shadcn
import clsx from "clsx";

const sidebarItems = ["Dashboard", "Users", "Settings"];

const Sidebar = ({ className }) => (
  <div
    className={clsx(
      "bg-gray-900 text-white w-64 h-full p-4 space-y-4",
      className
    )}
  >
    <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
    <nav className="space-y-2">
      {sidebarItems.map((item, idx) => (
        <div key={idx} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
          {item}
        </div>
      ))}
    </nav>
  </div>
);

const DrawerSidebar = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Drawer */}
        <motion.div
          className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-4 z-50"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
          <nav className="space-y-2">
            {sidebarItems.map((item, idx) => (
              <div key={idx} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
                {item}
              </div>
            ))}
          </nav>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AdminWrapper = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - visible on md+ screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" onClick={() => setDrawerOpen(true)} size="icon">
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Drawer Sidebar for small screens */}
      <DrawerSidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-y-auto ml-0 md:ml-64">
        {children || <div>Welcome to Admin Panel</div>}
      </main>
    </div>
  );
};

export default AdminWrapper;

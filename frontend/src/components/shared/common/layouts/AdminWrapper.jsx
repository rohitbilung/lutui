import { useRef, useState, useEffect } from "react";
import NavBar from "../NavBar";
import PageContent from "./PageContent";

const AdminWrapper = ({ children, title="" }) => {
  const navRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (navRef.current) {
        setSidebarWidth(navRef.current.offsetWidth);
      }
    };

    updateSidebarWidth();

    // Optional: update on window resize
    window.addEventListener("resize", updateSidebarWidth);
    return () => window.removeEventListener("resize", updateSidebarWidth);
  }, []);

  return (
    <div className="flex h-screen">
      <NavBar ref={navRef} userRole="admin" />

      {/* Main content */}
      <main
        className="flex-1 bg-gray-100 overflow-y-auto transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        
        <PageContent title={title} wrapperClass="py-3 px-4" contentClass="py-4 px-3 mb-12">
          {children || <div>Welcome to Admin Panel</div>}
        </PageContent>
      </main>
    </div>
  );
};

export default AdminWrapper;

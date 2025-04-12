import NavBar from "../NavBar";

const AdminWrapper = ({ children }) => {
  return (
    <div className="flex h-screen">
      <NavBar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {children || <div>Welcome to Admin Panel</div>}
      </main>
    </div>
  );
};

export default AdminWrapper;

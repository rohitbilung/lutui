import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../../../context/AuthContext";
import UserAvatar from "./UserAvatar";
import { useCart } from "../../../context/CartContext";

const TopHeader = () => {
  const { clearCart } = useCart()
  const { user, logout } = useAuth();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <div className="bg-black text-white py-3 px-2 w-full">
      <div className="w-full flex justify-center items-center text-center relative">
        <p className="text-sm flex-1 flex items-center justify-center text-center gap-2">
          Wearing Adivasi Narratives and Identity.
        </p>

        <div className="absolute right-0">
          <div className="flex justify-end text-right">
            <div className="flex items-center space-x-4">
              {/* Mobile: show dropdown menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 cursor-pointer">
                      <User className="w-5 h-5 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {user ? (
                      <>
                        {user.role === "user" && (
                          <>
                            <DropdownMenuItem asChild>
                              <span>My Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <span>My Orders</span>
                            </DropdownMenuItem>
                          </>
                        )}

                        {user.role === "admin" && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link to="/dashboard" className="cursor-pointer">
                                Dashboard
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/profile" className="cursor-pointer">
                                Profile
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem asChild>
                          <button className="w-full text-left text-red-500 cursor-pointer" onClick={handleLogout}>
                            Logout
                          </button>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/login" className="cursor-pointer">
                            Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/register" className="cursor-pointer">
                            Create Account
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop: show avatar or login/register */}
              <div className="hidden md:flex space-x-4 text-sm items-center">
                {user ? (
                  <UserAvatar />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="hover:text-blue-500 uppercase cursor-pointer"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="hover:text-blue-500 uppercase cursor-pointer"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

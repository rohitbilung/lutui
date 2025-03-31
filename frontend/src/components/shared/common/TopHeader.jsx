import { Phone, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import UserAvatar from "./UserAvatar";

const TopHeader = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Left Section: Currency, Language, and Phone */}
        <div className="flex items-center space-x-4">
          {/* Currency Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-white px-2"
              >
                INR <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>INR</DropdownMenuItem>
              <DropdownMenuItem>USD</DropdownMenuItem>
              <DropdownMenuItem>EUR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-white px-2"
              >
                English <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Phone Contact */}
          <p className="text-sm flex items-center gap-2">
            <Phone className="w-4 h-4 -scale-x-100 text-white" /> +91 9938 452
            439
          </p>
        </div>

        {/* Right Section: User Menu */}
        <div className="flex items-center space-x-4">
          {/* User Icon (Mobile) */}
          <Button variant="ghost" className="md:hidden p-2">
            <User className="w-5 h-5 text-white" />
          </Button>

          {/* Login & Signup (Desktop) */}
          <div className="hidden md:flex space-x-4 text-sm">
            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500 uppercase">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-500 uppercase">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

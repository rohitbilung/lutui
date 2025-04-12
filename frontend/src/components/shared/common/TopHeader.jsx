import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import UserAvatar from "./UserAvatar";

const TopHeader = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-black text-white py-2 px-2 w-full">
      <div className="w-full flex justify-center items-center text-center relative">
        <p className="text-sm flex-1 flex items-center justify-center text-center gap-2">
          Wearing Adivasi Narratives and Identity.
        </p>
        
        <div className="absolute right-0">
          <div className="flex justify-end text-right">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="md:hidden p-2">
                <User className="w-5 h-5 text-white" />
              </Button>

              <div className="hidden md:flex space-x-4 text-sm">
                {isAuthenticated ? (
                  <UserAvatar />
                ) : (
                  <>
                    <Link to="/login" className="hover:text-blue-500 uppercase">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="hover:text-blue-500 uppercase"
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

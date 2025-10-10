import { useNavigate } from "react-router-dom";
import { getUserInitails } from "../../../lib/utils";
import { useAuth } from "../../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCart } from "../../../context/CartContext";

const UserAvatar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profile_image || "/user-placeholder.png"} />
          <AvatarFallback>{getUserInitails(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {user.role === "user" && (
          <>
            <DropdownMenuItem onClick={() => {}} className="cursor-pointer">My Account</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}} className="cursor-pointer">My Orders</DropdownMenuItem>
          </>
        )}

        {user.role === "admin" && (
          <>
            <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default UserAvatar;

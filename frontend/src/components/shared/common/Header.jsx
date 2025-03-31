import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ShoppingBag, Menu, X } from "lucide-react"; // Icons from Lucide
import { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Header({
  className = "bg-[#440505] text-white",
  showShadow = false,
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      className={clsx("py-1", className, {
        "shadow-md": showShadow,
      })}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop Logo */}
        <div className="hidden lg:block">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-16" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="block lg:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Navigation Links */}
        <nav
          className={clsx("lg:flex lg:space-x-6", {
            "block absolute top-full left-0 w-full bg-white text-black shadow-md p-4":
              mobileNavOpen,
            hidden: !mobileNavOpen,
          })}
        >
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-600 capitalize">
            Products
          </Link>
          <Link to="/collection" className="hover:text-gray-600">
            Collection
          </Link>
          <Link to="/about-us" className="hover:text-gray-600">
            About Us
          </Link>
          <Link to="/blog" className="hover:text-gray-600">
            Blog
          </Link>
        </nav>

        {/* Cart Icon */}
        <CartIcon />
      </div>
    </header>
  );
}

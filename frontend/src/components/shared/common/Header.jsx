import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ShoppingBag, Menu, X } from "lucide-react"; // Icons from Lucide
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link to="/about-us" className="hover:text-gray-600">
            About Us
          </Link>
          <Link to="/blog" className="hover:text-gray-600">
            Blog
          </Link>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

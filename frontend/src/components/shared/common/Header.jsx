import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // If using className utility
import { ShoppingBag, Menu, X } from "lucide-react"; // Icons from Lucide
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header () {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop Logo */}
        <div className="hidden lg:block">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10" />
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
          className={cn(
            "lg:flex lg:space-x-6 text-gray-700",
            mobileNavOpen ? "block absolute top-16 left-0 w-full bg-white shadow-md p-4" : "hidden"
          )}
        >
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <Link href="/about-us" className="hover:text-gray-900">
            About Us
          </Link>
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <Link href="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

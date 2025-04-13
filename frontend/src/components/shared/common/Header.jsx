import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "Products",
    dropdown: [
      {
        label: "T-Shirts",
        to: `/product-list/${encodeURIComponent("T-Shirts")}`,
      },
      {
        label: "Tote Bags",
        to: `/product-list/${encodeURIComponent("Tote Bags")}`,
      },
      {
        label: "Pot Holders",
        to: `/product-list/${encodeURIComponent("Pot Holders")}`,
      },
    ],
  },
  {
    label: "Collection",
    dropdown: [
      {
        label: "Jethuari",
        to: `/collection/${encodeURIComponent("Jethuari")}`,
      },
      {
        label: "Khadia Tribe",
        to: `/collection/${encodeURIComponent("Khadia Tribe")}`,
      },
      {
        label: "Cuisines",
        to: `/collection/${encodeURIComponent("Cuisines")}`,
      },
    ],
  },
];

export default function Header({
  className = "bg-[#440505] text-white",
  showShadow = false,
}) {
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
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Menu size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {navLinks.map((item, index) => (
                <div key={index}>
                  {!item.dropdown ? (
                    <DropdownMenuItem asChild>
                      <Link to={item.to} className="w-full text-left">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                        {item.label}
                      </div>
                      {item.dropdown.map((subItem, subIndex) => (
                        <DropdownMenuItem asChild key={subIndex}>
                          <Link
                            to={subItem.to}
                            className="pl-4 w-full text-left"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Links */}
        <nav className={clsx("hidden lg:flex lg:space-x-6")}>
          {navLinks.map((link, index) =>
            !link.dropdown ? (
              <Link
                key={index}
                to={link.to}
                className="hover:text-gray-600 cursor-pointer"
              >
                {link.label}
              </Link>
            ) : (
              <span key={index} className="hover:text-gray-600 capitalize">
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    {link.label}
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-[#440505] border-0 z-[100]">
                    <div className="flex flex-col gap-2 text-center">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.to}
                          className="text-white hover:text-white/75 capitalize rounded-xl text-center"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </span>
            )
          )}
        </nav>

        <div>
          {/* Cart Icon */}
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

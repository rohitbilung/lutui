import { Phone } from "lucide-react";

const TopHeader = () => {
  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Section: Currency, Language, and Phone */}
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">INR</div>
            <div className="text-sm font-medium">English</div>
            <p className="text-sm flex items-center gap-1">
              <Phone className="w-4 h-4 -scale-x-100" fill="#fff" /> +91 9938 452 439
            </p>
          </div>

          {/* Center Section: Empty Placeholder (Hidden on Small Screens) */}
          <div className="hidden md:block text-center flex-1">
            <p className="text-sm text-gray-600"></p>
          </div>

          {/* Right Section: User Menu and Links */}
          <div className="flex items-center space-x-4">
            <span className="block md:hidden">
              <i className="anm anm-user-al text-lg"></i>
            </span>
            <ul className="hidden md:flex space-x-4 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 capitalize">Login</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 capitalize">Create Account</a>
              </li>
              {/* <li><a href="wishlist.html" className="hover:text-blue-500">Wishlist</a></li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

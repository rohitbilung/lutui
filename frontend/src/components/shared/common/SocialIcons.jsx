import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      <a href="#" className="text-gray-600 hover:text-blue-600">
        <Facebook size={24} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600">
        <Twitter size={24} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600">
        <Instagram size={24} />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-600">
        <Youtube size={24} />
      </a>
    </div>
  );
};

export default SocialIcons;

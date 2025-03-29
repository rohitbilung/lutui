import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex space-x-4 text-black">
      <a href="#">
        <Facebook size={24} />
      </a>
      <a href="#">
        <Twitter size={24} />
      </a>
      <a href="#">
        <Instagram size={24} />
      </a>
      <a href="#">
        <Youtube size={24} />
      </a>
    </div>
  );
};

export default SocialIcons;

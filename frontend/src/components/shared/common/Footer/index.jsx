import FooterLinks from "./components/FooterLinks";
import ContactInfo from "./components/ContactInfo";
import NewsletterSection from "../NewsletterSection";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 w-full">
      {/* Newsletter & Social Icons */}
      <div className="py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <NewsletterSection />
          <SocialIcons />
        </div>
      </div>

      {/* Footer Main Section */}
      <div className="bg-[var(--lutui)] py-6 text-white">
        <div className="container mx-auto px-4 flex gap-3 flex-col md:flex-row justify-between">
          <FooterLinks />
          <ContactInfo />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black py-3 text-center text-white">
        <p>
          All rights reserved &#169; 2025 || <a href="#" className="hover:underline">lutui.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

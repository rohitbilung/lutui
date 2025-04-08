import { Link } from "react-router-dom";

const FooterLinks = () => {
  return (
    <div className="w-full lg:w-7/12 flex flex-col md:items-center md:justify-center md:text-center">
      <h4 className="text-lg font-semibold mb-2">Information</h4>
      <ul className="space-y-1">
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/terms">Terms & Conditions</Link>
        </li>
        <li>
          <Link to="/cancellation-refund-policy">
            Cancellation/Refund Policy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterLinks;

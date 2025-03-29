const FooterLinks = () => {
    return (
      <div className="w-full lg:w-7/12 flex flex-col md:items-center md:justify-center md:text-center">
        <h4 className="text-lg font-semibold mb-2">Information</h4>
        <ul className="space-y-1">
          <li><a href="#" className="">About Us</a></li>
          <li className="cursor-not-allowed">Careers</li>
          <li className="cursor-not-allowed">Privacy Policy</li>
          <li className="cursor-not-allowed">Terms & Conditions</li>
          <li className="cursor-not-allowed">My Account</li>
        </ul>
      </div>
    );
  };
  
  export default FooterLinks;
  
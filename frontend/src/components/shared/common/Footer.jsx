const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Newsletter Section */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Newsletter Form */}
            <div className="w-full lg:w-7/12 flex justify-start items-center">
              <div>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Sign up for <span className="text-blue-600">Newsletter</span>
                </h2>
                <form className="flex items-center">
                  <input
                    type="email"
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    disabled
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Social Icons */}
            <div className="w-full lg:w-5/12 flex justify-end items-center mt-4 lg:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <i className="icon icon-facebook text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <i className="icon icon-twitter text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <i className="icon icon-instagram text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <i className="icon icon-youtube text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main Section */}
      <div className="bg-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Information Links */}
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-2">Informations</h4>
              <ul className="text-gray-600 space-y-1">
                <li><a href="#">About Us</a></li>
                <li className="text-gray-400 cursor-not-allowed">Careers</li>
                <li className="text-gray-400 cursor-not-allowed">Privacy Policy</li>
                <li className="text-gray-400 cursor-not-allowed">Terms & Conditions</li>
                <li className="text-gray-400 cursor-not-allowed">My Account</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="w-full lg:w-5/12">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <i className="icon anm anm-map-marker-al mr-2"></i>
                  Sundargarh, Bihabandh, Odisha, 770023 IN
                </li>
                <li>
                  <i className="icon anm anm-phone-s mr-2"></i> (91) 9938 452 439
                </li>
                <li>
                  <i className="icon anm anm-envelope-l mr-2"></i>
                  <p>sales@lutui.in</p>
                  <p>help@lutui.in</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-300 py-3 text-center">
        <p>
          All rights reserved &#169; 2025 || <a href="#" className="text-blue-600 hover:underline">lutui.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

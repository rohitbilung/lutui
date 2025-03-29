import { MapPin, Phone, Mail } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="w-full lg:w-5/12 flex flex-col md:items-center md:justify-center">
      <div>
        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
        <ul className="space-y-2">
          <li className="flex items-center">
            <MapPin size={20} className="mr-2" />
            Sundargarh, Bihabandh, Odisha, 770023 IN
          </li>
          <li className="flex items-center">
            <Phone size={20} className="mr-2" />
            (91) 9938 452 439
          </li>
          <li className="flex items-center">
            <Mail size={20} className="mr-2" />
            <div>
              <p>sales@lutui.in</p>
              <p>help@lutui.in</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;

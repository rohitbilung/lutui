import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"; // adjust imports as needed

const SocialIcons = () => {
  const socialItems = [
    { icon: <Facebook />, color: "from-blue-500 to-blue-700", url: "" },
    { icon: <Twitter />, color: "from-sky-400 to-sky-600", url: "" },
    {
      icon: <Instagram />,
      color: "from-yellow-400 via-pink-500 to-purple-600",
      url: "https://www.instagram.com/lutui.in/?hl=en",
    },
    { icon: <Youtube />, color: "from-red-500 to-red-700", url: "" },
  ];

  return (
    <>
      <div className="flex space-x-6 justify-center items-center mr-12">
        {socialItems.map((item, index) => (
          <a
            key={index}
            href={item.url || "#"}
            target={item.url ? "_blank" : ""}
            rel={item.url ? "noopener noreferrer" : ""}
          >
            <button
              className={`relative overflow-hidden ripple-btn p-3 rounded-full bg-gradient-to-br ${
                item.color
              } shadow-lg 
                          hover:scale-110 active:scale-90 transform transition duration-200 ${
                            !item.url
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                          }`}
            >
              <div className="text-white w-6 h-6">{item.icon}</div>
            </button>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialIcons;

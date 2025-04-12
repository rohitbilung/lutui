import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"; // adjust imports as needed
import { motion } from "framer-motion"; // Import framer-motion

const SocialIcons = () => {
  const [ripples, setRipples] = useState({});

  const createRipple = (e, index) => {
    const button = e.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const left = e.clientX - button.getBoundingClientRect().left - radius;
    const top = e.clientY - button.getBoundingClientRect().top - radius;

    const newRipple = {
      left,
      top,
      diameter,
      key: Date.now(),
    };

    setRipples((prev) => ({ ...prev, [index]: newRipple }));

    // Remove ripple after animation duration
    setTimeout(() => {
      setRipples((prev) => ({ ...prev, [index]: null }));
    }, 600);
  };

  const socialItems = [
    { icon: <Facebook />, color: "from-blue-500 to-blue-700", url: "" },
    { icon: <Twitter />, color: "from-sky-400 to-sky-600", url: "" },
    {
      icon: <Instagram />,
      color: "from-yellow-400 via-pink-500 to-purple-600",
      url: "https://www.instagram.com/eugene_ke_cuisine/?hl=en",
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
                            !item.url ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                          }`}
              disabled={!item.url}
              onClick={(e) => item.url && createRipple(e, index)}
            >
              <div className="text-white w-6 h-6">{item.icon}</div>

              {/* Framer Motion for ripple animation */}
              {ripples[index] && (
                <motion.span
                  className="absolute rounded-full bg-white opacity-50"
                  style={{
                    width: ripples[index].diameter,
                    height: ripples[index].diameter,
                    left: ripples[index].left,
                    top: ripples[index].top,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: 4,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "ease-out",
                  }}
                />
              )}
            </button>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialIcons;

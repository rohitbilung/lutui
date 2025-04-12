import { useEffect } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const SocialIcons = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".ripple-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        const ripple = btn.getElementsByClassName("ripple")[0];

        if (ripple) {
          ripple.remove();
        }

        btn.appendChild(circle);
      });
    });
  }, []);

  return (
    <>
      <style>{`
        .ripple-btn {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .ripple-btn.disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.5);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>

      <div className="flex space-x-6 justify-center items-center mr-12">
        {[
          { icon: <Facebook />, color: "from-blue-500 to-blue-700", url: "" },
          { icon: <Twitter />, color: "from-sky-400 to-sky-600", url: "" },
          { icon: <Instagram />, color: "from-yellow-400 via-pink-500 to-purple-600", url: "https://www.instagram.com/eugene_ke_cuisine/?hl=en" },
          { icon: <Youtube />, color: "from-red-500 to-red-700", url: "" },
        ].map((item, index) => (
          <a key={index} href={item.url || "#"} target={item.url ? "_blank" : ""} rel={item.url ? "noopener noreferrer" : ""}>
            <button
              className={`ripple-btn p-3 rounded-full bg-gradient-to-br ${item.color} shadow-lg
                          hover:scale-110 active:scale-90 transform transition duration-200 ${!item.url ? "disabled" : ""}`}
              disabled={!item.url} // Disable the button if no URL
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

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const DiwaliPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#440505] text-white shadow-2xl"
          >
            {/* Decorative Glow */}
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-yellow-500/20 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />

            {/* Close Button */}
            <button
              onClick={closePopup}
              aria-label="Close popup"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative px-6 py-10 text-center sm:px-10 sm:py-12">

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10"
              >
                <span className="text-5xl">🪷</span>
              </motion.div>

              {/* Small Heading */}
              <div className="mb-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-yellow-300">
                <Sparkles size={14} />
                A Little Pause
                <Sparkles size={14} />
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl font-bold sm:text-4xl">
                Taking a Little Break
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-white/80">
                We’re taking a short pause to refresh, create, and bring you
                something new.
              </p>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/60">
                Our store will be back soon with more products and stories to
                share.
              </p>

              {/* Divider */}
              <div className="mx-auto my-7 h-px w-16 bg-yellow-400/40" />

              {/* Closing Message */}
              <p className="text-lg font-medium text-yellow-300">
                See You Soon ❤️
              </p>

              {/* Close Button */}
              <button
                onClick={closePopup}
                className="mt-7 rounded-xl border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiwaliPopup;
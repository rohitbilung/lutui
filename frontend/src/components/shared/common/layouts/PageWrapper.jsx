import clsx from "clsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TopHeader from "../TopHeader";
import Footer from "../Footer";
import Header from "../Header";

const PageWrapper = ({ showInitialHeader = true, children=null }) => {
  const { ref, inView } = useInView({
    threshold: 0, // When it's completely out of view
  });

  return (
    <div>
      <TopHeader />
      <div
        className={clsx("w-full z-50", {
          'hidden': !showInitialHeader,
        })}
      >
        <Header />
      </div>

      <div ref={ref} className="absolute top-44"></div>

      {/* Sticky Header (Animated with delay) */}
      {!inView && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Start hidden and slightly above
          animate={{ opacity: 1, y: 0 }} // Fade in and slide down
          exit={{ opacity: 0, y: -20 }} // Fade out and slide up
          transition={{ duration: 0.3, delay: 0.2 }} // Smooth animation with delay
          className="fixed top-0 left-0 w-full z-[100] shadow-md transition-all duration-300"
        >
          <Header />
        </motion.div>
      )}

      {children}

      <Footer />
    </div>
  );
};

export default PageWrapper;

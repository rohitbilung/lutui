import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TopHeader from "../../components/shared/common/TopHeader";
import Footer from "../../components/shared/common/Footer";
import HomeSlider from "../../components/shared/common/HomeSlider";
import FeaturedProducts from "../../components/shared/common/FeaturedProducts";
import Header from "../../components/shared/common/Header";

const Home = () => {
  // Observe the Header
  const { ref, inView } = useInView({
    threshold: 0, // When it's completely out of view
  });

  return (
    <div className="w-full">
      <TopHeader />

      <div className="w-full relative">
        <div className="absolute w-full z-50" ref={ref}>
          <Header className="bg-transparent text-white" />
        </div>
        <HomeSlider />
      </div>
      
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

      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;

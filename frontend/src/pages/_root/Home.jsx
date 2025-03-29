import HomeSlider from "../../components/shared/HomeSlider";
import FeaturedProducts from "../../components/shared/FeaturedProducts";
import Header from "../../components/shared/common/Header";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";

const Home = () => {
  return (
    <PageWrapper showInitialHeader={false}>
      <div className="w-full relative">
        <div className="absolute w-full z-50">
          <Header className="bg-transparent text-white" />
        </div>
        <HomeSlider />
      </div>

      <FeaturedProducts />
    </PageWrapper>
  );
};

export default Home;

import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../../lib/queries/queries";

const FeaturedProducts = () => {
  const { data, isPending } = useGetProducts({ limit: 10, page: 1 });
  const products = data?.data || [];

  return (
    
    <div className="container mx-auto py-10">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-[#440505]">JOHAR</h1>
        <p className="text-[#440505]">
        With heartfelt joy, we share the first chapter of our journey with you.
        </p>
        <p className="text-[#440505]">
        Our very first collection, designed with love, care, compassion and pride.
        </p>
      </div>
      <hr className="border-t border-gray-300" />
      <div>
        {isPending ? (
          <div className="flex justify-center col-span-full">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center">
            <p>Featured products not available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mx-0 lg:px-8 lg:mx-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;

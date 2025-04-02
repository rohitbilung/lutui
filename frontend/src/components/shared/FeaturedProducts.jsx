import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../../lib/queries/queries";

const FeaturedProducts = () => {
  const { data, isPending } = useGetProducts({ limit: 10, page: 1 });
  const products = data?.data || [];
  
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Featured Collection</h2>
        <p className="text-gray-500">
          Our most popular products based on sales
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mx-0 lg:px-8 lg:mx-8">
        {isPending ? (
          <div className="flex justify-center col-span-full">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;

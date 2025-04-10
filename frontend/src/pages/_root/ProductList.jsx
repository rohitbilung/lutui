import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProducts } from "../../lib/queries/queries";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import { Loader2 } from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";

const ProductList = () => {
  const { product_type } = useParams();
  const category = decodeURIComponent(product_type);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isPending } = useGetProducts({
    page,
    limit,
    category: product_type ? category : "",
  });
  const products = data?.data || [];

  return (
    <PageWrapper>
      <PageContent title={product_type ? category : "Products"}>
        <div>
          {isPending ? (
            <div className="flex justify-center col-span-full">
              <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center">
              <p>No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 mx-0 lg:px-8 lg:mx-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default ProductList;

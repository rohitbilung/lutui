import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "../../data/info";
import { useCart } from "../../context/CartContext";
import AddToCartButton from "./common/layouts/AddToCartButton";

const FeaturedProducts = () => {
  const { addToCart, removeOneFromCart } = useCart();

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Featured Collection</h2>
        <p className="text-gray-500">
          Our most popular products based on sales
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mx-0 lg:px-8 lg:mx-8">
        {products.map((product) => (
          <Card key={product._id} className="shadow-lg border-0 group relative">
            {/* Product Image Wrapper */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover aspect-square"
              />

              {/* Add To Cart Button - Hidden by default, shown on hover */}
              <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 lg:p-4">
                <AddToCartButton product={product} />
              </div>
            </div>

            <CardContent className="text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-primary font-bold">₹{product.price}.00</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

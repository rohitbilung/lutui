import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Banda Bhunjdi",
    price: 499,
    image: "/product/product-image-1.JPG",
  },
  {
    id: 2,
    name: "Roz Roz Guna Tiyan",
    price: 499,
    image: "/product/product-image-2.JPG",
  },
  { id: 3, name: "Phool", price: 499, image: "/product/product-image-3.JPG" },
  {
    id: 4,
    name: "Banda Bhunjri",
    price: 499,
    image: "/product/product-image-4.JPG",
  },
  {
    id: 5,
    name: "Roz Roz Guna Tiyan",
    price: 499,
    image: "/product/product-image-5.JPG",
  },
  { id: 6, name: "Phool", price: 499, image: "/product/product-image-6.JPG" },
];

const FeaturedProducts = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Featured Collection</h2>
        <p className="text-gray-500">
          Our most popular products based on sales
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mx-0 lg:px-8 lg:mx-8">
        {/* {products.map((product) => (
          <Card key={product.id} className="shadow-lg border-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-fill"
            />
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-primary font-bold">₹{product.price}.00</p>
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={() => {}}>Add To Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))} */}
        {products.map((product) => (
          <Card key={product.id} className="shadow-lg border-0 group relative">
            {/* Product Image Wrapper */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-fill"
              />

              {/* Add To Cart Button - Hidden by default, shown on hover */}
              <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 lg:p-4">
                <Button
                  onClick={() => {}}
                  className="w-full"
                  variant="secondary"
                >
                  ADD TO CART
                </Button>
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

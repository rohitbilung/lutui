import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/info";
import { Button } from "@/components/ui/button";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import AddToCartButton from "../../components/shared/common/layouts/AddToCartButton";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item._id === id);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");

  return (
    <PageWrapper>
      <PageContent title="Product Details">
        {product ? (
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg">
            {/* Left Section - Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-2 items-center w-full">
              {/* Thumbnails */}
              <div className="max-h-[400px] md:h-full flex md:flex-col md:mt-4 gap-2 overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-16 h-16 object-cover border cursor-pointer transition-transform duration-200 ${
                      selectedImage === img
                        ? "border-blue-500 scale-110 shadow-md"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Main Product Image */}
              <div className="p-2 flex-1">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-[400px] w-full object-contain"
                />
              </div>
            </div>

            {/* Right Section - Product Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <h3 className="text-xl font-semibold text-green-600">
                ₹{product.price}
              </h3>
              <p className="text-gray-600">{product.description}</p>

              {product.countInStock > 0 ? (
                <p className="text-sm text-gray-500">
                  {product.countInStock} items in stock
                </p>
              ) : (
                <p className="text-sm text-red-500">Out of stock</p>
              )}
              <AddToCartButton product={product} btnVariant="blue" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h5 className="text-lg font-medium">Product does not exist.</h5>
            <p>
              It seems the product you are looking for either does not exist or has
              been removed.
            </p>
          </div>
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default ProductDetails;

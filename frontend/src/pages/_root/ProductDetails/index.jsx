import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../../components/shared/common/layouts/PageContent";
import AddToCartButton from "../../../components/shared/common/layouts/AddToCartButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductByID } from "../../../lib/queries/queries";
import SizeTabContent from "./components/SizeTabContent";
import { useAuth } from "../../../context/AuthContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [size, setSize] = useState("regular");
  const [shirtSize, setShirtSize] = useState("S");

  const { user } = useAuth();
  const userId = useMemo(() => {
    if (user) return user._id;
    else return "";
  }, [user]);
  const { data, isPending } = useGetProductByID({ productId });
  const product = data?.data || null;

  const [selectedImage, setSelectedImage] = useState("");
  const [colorData, setColorData] = useState(null);

  const price = useMemo(() => {
    if (product && size) {
      return product.sizeType[size].price;
    } else {
      return 0;
    }
  }, [product, size]);

  const cartData = useMemo(() => {
    if (product && size && shirtSize && colorData) {
      return {
        productId: product._id,
        color: colorData.color,
        size: shirtSize,
        type: size,
        price: price || 0,
        product,
      };
    } else {
      return null;
    }
  }, [product, price, size, shirtSize, colorData]);

  return (
    <PageWrapper>
      <PageContent title="Product Details">
        {product ? (
          <div className="flex flex-col gap-4 px-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
              {/* Left Section - Image Gallery */}
              <div className="flex flex-col-reverse md:flex-row gap-2 items-center w-full">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 max-w-full md:max-w-none overflow-x-auto md:overflow-y-auto scrollbar-thin">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                      className={`w-14 h-14 sm:w-16 sm:h-16 object-cover border cursor-pointer transition-transform duration-200 ${(selectedImage === "" && index === 0) || selectedImage === img
                          ? "border-blue-500 scale-110 shadow-md"
                          : "border-gray-300 hover:scale-105"
                        }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>

                {/* Main Product Image */}
                <div className="p-2 flex-1 w-full">
                  <img
                    src={selectedImage || product.images[0]}
                    alt={product.name}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    className="max-h-[400px] sm:max-h-[500px] w-full object-contain"
                  />
                </div>
              </div>

              {/* Right Section - Product Info */}
              <div className="space-y-4 w-full">
                <h2 className="text-xl sm:text-2xl font-semibold">{product.name}</h2>
                <h3 className="text-lg sm:text-xl font-semibold">{`₹ ${price}`}</h3>

                {/* Tabs */}
                <div className="w-full">
                  <Tabs
                    value={size}
                    onValueChange={setSize}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2 text-sm sm:text-base bg-[#00BF63] rounded-md overflow-hidden">
                      <TabsTrigger value="regular">Regular Shirt</TabsTrigger>
                      <TabsTrigger value="oversized">Oversize Shirt</TabsTrigger>
                    </TabsList>

                    <TabsContent value="regular">
                      <SizeTabContent
                        product={product}
                        tab={size}
                        shirtSize={shirtSize}
                        setShirtSize={setShirtSize}
                        colorData={colorData}
                        setColorData={setColorData}
                      />
                    </TabsContent>
                    <TabsContent value="oversized">
                      <SizeTabContent
                        product={product}
                        tab={size}
                        shirtSize={shirtSize}
                        setShirtSize={setShirtSize}
                        colorData={colorData}
                        setColorData={setColorData}
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Add to Cart Button */}
                <AddToCartButton
                  product={{ ...cartData, productId: product }}
                  disabled={!colorData}
                  btnVariant="blue"
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl underline font-semibold">Design Description</h2>
              <p className="text-sm sm:text-base md:text-lg indent-6 sm:indent-12 md:indent-24">
                {product.description}
              </p>

              {product.credits && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold underline mb-2">Design Credits</h3>
                  <div className="text-sm sm:text-base">
                    {Object.entries(product.credits).map(([role, name]) => (
                      <p key={role}>
                        <span className="font-semibold">{role}:</span> {name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center justify-center">
            <h5 className="text-lg font-medium">Product does not exist.</h5>
            <p>
              It seems the product you are looking for either does not exist or
              has been removed.
            </p>
          </div>
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default ProductDetails;

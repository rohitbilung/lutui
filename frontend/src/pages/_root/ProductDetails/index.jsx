import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../../components/shared/common/layouts/PageContent";
import AddToCartButton from "../../../components/shared/common/layouts/AddToCartButton";
import { ShirtIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useGetProductByID } from "../../../lib/queries/queries";
import SizeBadges from "./components/SizeBadges";
import ColorOptions from "./components/ColorOptions";
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
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg">
              {/* Left Section - Image Gallery */}
              <div className="flex flex-col-reverse md:flex-row gap-2 items-center w-full">
                {/* Thumbnails */}
                <div className="max-h-[600px] md:h-full flex md:flex-col md:mt-4 gap-2 overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`w-16 h-16 object-cover border cursor-pointer transition-transform duration-200 ${(selectedImage === "" && index == 0) ||
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
                    src={selectedImage || product.images[0]}
                    alt={product.name}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    className="max-h-[500px] w-full object-contain"
                  />
                </div>
              </div>

              {/* Right Section - Product Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <h3 className="text-xl font-semibold">{`₹ ${price}`}</h3>

                <div>
                  <Tabs
                    value={size}
                    className="w-[400px]"
                    onValueChange={setSize}
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-[#00BF63]">
                      <TabsTrigger value="regular" className="cursor-pointer">
                        Regular Shirt
                      </TabsTrigger>
                      <TabsTrigger value="oversized" className="cursor-pointer">
                        Oversize Shirt
                      </TabsTrigger>
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

                <AddToCartButton
                  product={{ ...cartData, productId: product }}
                  disabled={colorData ? false : true}
                  btnVariant="blue"
                />
                {/* {cartData && (
                  <AddToCartButton product={cartData} btnVariant="blue" />
                )} */}
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl underline font-semibold">
                Design Description
              </h2>
              <p className="text-base md:text-lg indent-8 md:indent-24">
                {product.description}
              </p>
              {product.credits && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold underline mb-2">Design Credits</h3>
                  <div className="text-m ">
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

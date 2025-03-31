import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/info";
import { Button } from "@/components/ui/button";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import AddToCartButton from "../../components/shared/common/layouts/AddToCartButton";
import { ShirtIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetails = () => {
  const { id } = useParams();
  const [viewSize, setViewSize] = useState(false);
  const [size, setSize] = useState("regular");
  const product = products.find((item) => item._id === id);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");

  const openViewSize = () => setViewSize(true);

  return (
    <PageWrapper>
      <PageContent title="Product Details">
        {product ? (
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg">
            <Dialog open={viewSize} onOpenChange={setViewSize}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Regular Shirt Size</DialogTitle>
                  <DialogDescription>
                    <img
                      src="/sizes/regular-shirt.png"
                      className="max-h-[500px]"
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

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
              {/* <h3 className="text-xl font-semibold">₹{product.price}</h3> */}
              <h3 className="text-xl font-semibold">{size === 'regular' ? `₹${product.price}` : `₹${product.price + 100}`}</h3>

              <Tabs value={size} className="w-[400px]" onValueChange={setSize}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="regular">Regular Shirt</TabsTrigger>
                  <TabsTrigger value="oversize">Oversize Shirt</TabsTrigger>
                </TabsList>
                <TabsContent value="regular">
                  <h5 className="font-medium text-lg underline">Description</h5>
                  <div className="flex flex-col gap-1">
                    <div>
                      <strong>Neck:</strong> Round Neck
                    </div>
                    <div>
                      <strong>Sleeve:</strong> Half Sleeve{" "}
                    </div>
                    <div>
                      <strong>Fabric:</strong> 100% Cotton (Double Bio Wash)
                    </div>
                    <div>
                      <strong>Fit:</strong> Regular
                    </div>
                    <div>
                      <strong>GSM:</strong> 180 GSM
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={openViewSize}
                      >
                        <ShirtIcon /> View Size Chart
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="oversize">
                  <h5 className="font-medium text-lg underline">Description</h5>
                  <div className="flex flex-col gap-1">
                    <div>
                      <strong>Neck:</strong> Round Neck
                    </div>
                    <div>
                      <strong>Sleeve:</strong> Half Sleeve{" "}
                    </div>
                    <div>
                      <strong>Fabric:</strong> 100% Cotton (Double Bio Wash)
                    </div>
                    <div>
                      <strong>Fit:</strong> Oversize
                    </div>
                    <div>
                      <strong>GSM:</strong> 220 GSM
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={openViewSize}
                      >
                        <ShirtIcon /> View Size Chart
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <AddToCartButton product={product} btnVariant="blue" />
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

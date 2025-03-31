import { Card, CardContent } from "@/components/ui/card";
import AddToCartButton from "./common/layouts/AddToCartButton";

const ProductCard = ({ product }) => {
  return product ? (
    <Card key={product._id} className="shadow-lg border-0 group relative">
      {/* Product Image Wrapper */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full object-cover aspect-square"
        />

        {/* Add To Cart Button - Hidden by default, shown on hover */}
        <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 lg:p-4">
          <AddToCartButton product={product} showViewButton={true} />
        </div>
      </div>

      <CardContent className="text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-primary font-bold">₹{product.price}.00</p>
      </CardContent>
    </Card>
  ) : null;
};

export default ProductCard;

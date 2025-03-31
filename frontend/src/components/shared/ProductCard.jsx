import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const visitProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card key={product._id} className="shadow-lg border-0 group relative">
      {/* Product Image Wrapper */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full object-cover aspect-square cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          onClick={visitProductDetails}
        />
        {/* <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div> */}
      </div>

      <CardContent className="text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {/* <p className="text-primary font-bold">₹{product.price}.00</p> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;

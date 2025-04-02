import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card";

const ProductCardLoader = () => {
  return (
    <Card className="shadow-lg border-0 group">
      <div className="relative">
        <Skeleton className="w-full h-[220px]" />
      </div>
      <CardContent className="flex justify-center items-center">
        <Skeleton className="h-4 w-full max-w-[80px]" />
      </CardContent>
    </Card>
  );
};

export default ProductCardLoader;

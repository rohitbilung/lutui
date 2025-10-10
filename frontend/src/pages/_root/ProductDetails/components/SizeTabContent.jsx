import { useState } from "react";
import { ShirtIcon } from "lucide-react";
import SizeBadges from "./SizeBadges";
import ColorOptions from "./ColorOptions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SizeTabContent = ({
  product,
  tab = "regular",
  colorData,
  shirtSize,
  setShirtSize,
  setColorData,
}) => {
  const [viewSize, setViewSize] = useState(false);

  const openViewSize = () => setViewSize(true);

  return (
    <div>
      <Dialog open={viewSize} onOpenChange={setViewSize}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <span className="capitalize">{tab}</span> Shirt Size
            </DialogTitle>
            <DialogDescription>
              <img
                src={
                  tab === "regular"
                    ? "/sizes/regular-shirt.png"
                    : "/sizes/oversize-shirt.png"
                }
                className="max-h-[500px]"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
          <strong>Fit:</strong> <span className="capitalize">{tab}</span>
        </div>
        <div>
          <strong>GSM:</strong> {tab === "regular" ? "180 GSM" : "220 GSM"}
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <strong>Size:</strong>
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
          <div className="flex gap-2">
            <SizeBadges
              product={product}
              shirtSize={shirtSize}
              sizeType={tab}
              onSelect={(value) => setShirtSize(value)}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <strong>Color:</strong>
          <div className="flex flex-row gap-2">
            <ColorOptions
              selected={colorData}
              setSelected={setColorData}
              size={shirtSize}
              sizeTypeList={product.sizeType[tab].sizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeTabContent;

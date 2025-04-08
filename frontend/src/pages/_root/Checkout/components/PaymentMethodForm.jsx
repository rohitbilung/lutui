import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PaymentMethodForm = () => {
  const { register, setValue, watch } = useFormContext();
  const selected = watch("paymentMethod");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <RadioGroup
        defaultValue="razorpay"
        value={selected}
        onValueChange={(val) => setValue("paymentMethod", val)}
        className="space-y-2"
      >
        {[
          { id: "razorpay", label: "Razorpay Payment" },
        ].map(({ id, label }) => (
          <div key={id} className="flex items-center space-x-2">
            <RadioGroupItem value={id} id={id} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodForm;

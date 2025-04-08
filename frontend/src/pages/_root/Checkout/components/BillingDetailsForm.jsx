import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const BillingDetailsForm = () => {
  const { register, formState: { errors } } = useFormContext();

  const field = (id, label, type = "text", span = false, placeholder = "") => (
    <div className={span ? "col-span-2" : ""}>
      <Label htmlFor={id} className="mb-2">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
      />
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {field("name", "Full Name", "text", true, "e.g. John Doe")}
      {field("email", "Email", "email", false, "e.g. john@example.com")}
      {field("phone", "Phone", "text", false, "e.g. +91 9876543210")}
      {field("address1", "Address Line 1", "text", true, "e.g. 123 Main St")}
      {field("address2", "Address Line 2", "text", true, "Apartment, suite, etc. (optional)")}
      {field("pincode", "PIN Code", "text", false, "e.g. 751007")}
      {field("district", "District", "text", false, "e.g. Khordha")}
      {field("state", "State / Region", "text", false, "e.g. Odisha")}
      {field("country", "Country", "text", false, "e.g. India")}
      <div className="col-span-2">
        <Label htmlFor="notes" className="mb-2">Order Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional info (optional)"
          {...register("notes")}
        />
      </div>
    </div>
  );
};

export default BillingDetailsForm;

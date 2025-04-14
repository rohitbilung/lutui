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
    <div className="p-4 sm:p-6 space-y-8">
      {/* Contact Details */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>{field("name", "Full Name", "text", true, "e.g. John Doe")}</div>
          <div>{field("email", "Email", "email", false, "e.g. john@example.com")}</div>
          <div>{field("phone", "Phone", "text", false, "e.g. +91 9876543210")}</div>
        </div>
      </section>

      {/* Address Details */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>{field("address1", "Address Line 1", "text", true, "e.g. 123 Main St")}</div>
          <div>{field("address2", "Address Line 2", "text", true, "Apartment, suite, etc. (optional)")}</div>
          <div>{field("pincode", "PIN Code", "text", false, "e.g. 751007")}</div>
          <div>{field("district", "District", "text", false, "e.g. Khordha")}</div>
          <div>{field("state", "State / Region", "text", false, "e.g. Odisha")}</div>
          <div>{field("country", "Country", "text", false, "e.g. India")}</div>
        </div>
      </section>

      {/* Order Notes */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Notes</h2>
        <div className="w-full">
          <Label htmlFor="notes" className="mb-2 block">Additional Info</Label>
          <Textarea
            id="notes"
            placeholder="Any specific instructions (optional)"
            className="w-full min-h-[100px]"
            {...register("notes")}
          />
        </div>
      </section>
    </div>


  );
};

export default BillingDetailsForm;

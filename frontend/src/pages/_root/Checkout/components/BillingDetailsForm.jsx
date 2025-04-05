import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const BillingDetailsForm = () => {
  const { register, formState: { errors } } = useFormContext();

  const field = (id, label, type = "text", span = false) => (
    <div className={span ? "col-span-2" : ""}>
      <Label htmlFor={id} className="mb-2">{label}</Label>
      <Input id={id} type={type} {...register(id)} />
      {errors[id] && (
        <p className="text-sm text-red-500">{(errors)[id]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {field("firstName", "First Name")}
      {field("lastName", "Last Name")}
      {field("email", "E-Mail", "email")}
      {field("phone", "Telephone")}
      {field("company", "Company", "text", true)}
      {field("address", "Address", "text", true)}
      {field("apartment", "Apartment")}
      {field("city", "City")}
      {field("postCode", "Post Code")}
      {field("country", "Country")}
      {field("state", "Region / State")}
      <div className="col-span-2">
        <Label htmlFor="notes" className="mb-2">Order Notes</Label>
        <Textarea id="notes" {...register("notes")} />
      </div>
    </div>
  );
};

export default BillingDetailsForm;

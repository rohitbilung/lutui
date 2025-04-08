import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/shared/common/layouts/PageWrapper";
import PageContent from "@/components/shared/common/layouts/PageContent";
import PaymentMethodForm from "./components/PaymentMethodForm";
import OrderSummary from "./components/OrderSummary";
import BillingDetailsForm from "./components/BillingDetailsForm";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { CreditCard } from "lucide-react";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "PIN Code is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

const Checkout = () => {
  const { user } = useAuth()
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        ...methods.getValues(), // preserve other values if already filled
        name: user.name || "",
        email: user.email || "",
        phone: user.mobile || "",
      });
    }
  },[user])

  const onSubmit = (data) => {
    console.log("Checkout data:", data);
  };

  return (
    <PageWrapper>
      <PageContent title="Checkout">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="px-2">
              <h2 className="text-xl font-semibold mb-4 underline">Billing & Shipping Details</h2>
              <BillingDetailsForm />
            </div>
            <div className="flex flex-col gap-4 px-2">
              <OrderSummary />
              <PaymentMethodForm />
              <Button type="submit" className="w-full mt-4">
                <CreditCard className="w-5 h-5" />
                Place Order
              </Button>
            </div>
          </form>
        </FormProvider>
      </PageContent>
    </PageWrapper>
  );
};

export default Checkout;

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/shared/common/layouts/PageWrapper";
import PageContent from "@/components/shared/common/layouts/PageContent";
import PaymentMethodForm from "./components/PaymentMethodForm";
import OrderSummary from "./components/OrderSummary";
import BillingDetailsForm from "./components/BillingDetailsForm";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  phone: z.string(),
  company: z.string().optional(),
  address: z.string(),
  apartment: z.string(),
  city: z.string(),
  postCode: z.string(),
  country: z.string(),
  state: z.string(),
  notes: z.string().optional(),
  paymentMethod: z.string(),
});

const Checkout = () => {
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
  });

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

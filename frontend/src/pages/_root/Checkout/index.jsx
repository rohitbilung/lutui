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
import {
  useCheckoutCart,
  useCreatePayment,
  useVerifyPayment,
} from "../../../lib/queries/Mutations";
import { useCart } from "../../../context/CartContext";
import { toast } from "sonner";
import { API_URL, RAZORPAY_KEY_ID } from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const { totalPrice, cart } = useCart();
  const { user } = useAuth();
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "razorpay" },
  });
  const { mutateAsync: checkoutCart, isPending: isCheckingOut } =
    useCheckoutCart();
  const { mutateAsync: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const { mutateAsync: verifyPayment, isPending: isVerifyingPayment } =
    useVerifyPayment();

  useEffect(() => {
    if (user) {
      methods.reset({
        ...methods.getValues(), // preserve other values if already filled
        name: user.name || "",
        email: user.email || "",
        phone: user.mobile || "",
        paymentMethod: "razorpay",
      });
    }
  }, [user]);

  const onSubmit = async (values) => {
    if (isCheckingOut) return;
    const products = cart.map((item) => {
      return {
        productId: item.productId._id,
        color: item.color,
        size: item.size,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
      };
    });
    const response = await checkoutCart({
      userId: user ? user._id : "",
      name: values.name,
      email: values.email,
      phone: values.phone,
      shippingAddress: {
        Address1: values.address1,
        Address2: values.address2,
        district: values.district,
        state: values.state,
        pincode: values.pincode,
        country: values.country,
      },
      paymentMethod: values.paymentMethod,
      orderNotes: values.notes,
      products: products,
    });
    if (response.success) {
      confirmPayment(values);
    } else {
      toast.error(response.message);
    }
  };

  const confirmPayment = async (values) => {
    if (isCreatingPayment) return;
    const { name, email, phone } = values;
    try {
      const response = await createPayment({ amount: totalPrice });
      if (response.success) {
        const options = {
          key: response.key_id, // Replace with your key
          amount: response.amount,
          currency: response.currency,
          name: "Lutui.in",
          description: "Product purchase payment",
          order_id: response.order_id,
          prefill: {
            name: name,
            email: email,
            contact: phone,
          },
          handler: async (response) => {
            await verifyPayment(response);
            toast.success("Payment Successful");
            methods.reset();
            setTimeout(() => {
              navigate("/");
            }, 3000);
          },
          theme: { color: "#3399cc" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while creating payment: ", error);
      toast.error("Payment Error");
    }
  };
  return (
    <PageWrapper>
      <PageContent title="Checkout">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left Column: Billing & Shipping */}
            <div className="px-4 sm:px-6 md:px-2">
              <h2 className="text-xl font-semibold mb-4 underline">
                Billing & Shipping Details
              </h2>
              <BillingDetailsForm />
            </div>

            {/* Right Column: Summary, Payment & Submit */}
            <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-2">
              <OrderSummary />
              <PaymentMethodForm />
              <Button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2"
                disabled={isCheckingOut || isCreatingPayment}
              >
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

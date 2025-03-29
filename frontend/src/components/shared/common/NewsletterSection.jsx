import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewsletterSection = () => {
  return (
    <div className="py-6 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Sign up for <span className="text-primary">Newsletter</span>
        </h2>
        <form className="flex items-center max-w-md mx-auto">
          <div className="w-full">
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              className="w-full"
              required
            />
          </div>
          <Button className="w-auto" disabled>
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
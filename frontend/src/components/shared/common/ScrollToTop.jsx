import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={handleScrollToTop}
        className={`transition-opacity duration-300 rounded-full border border-slate-600 bg-background text-foreground hover:bg-muted 
      shadow-lg shadow-slate-700/70 backdrop-blur-sm ring-1 ring-slate-500/10 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}

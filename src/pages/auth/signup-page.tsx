import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";
import { useEffect } from "react";

export default function SignupPage() {
  // Update page title
  useEffect(() => {
    document.title = "Sign Up - SaaSApp";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center py-12">
        <div className="mb-8 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <Boxes className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SaaSApp</span>
          </Link>
        </div>
        <SignupForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
  // Update page title
  useEffect(() => {
    document.title = "Reset Password - SaaSApp";
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
        <ForgotPasswordForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
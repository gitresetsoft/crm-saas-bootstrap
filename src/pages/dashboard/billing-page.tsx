import { useEffect } from "react";
import { CreditCard, CheckCircle, Calendar, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

// Mock data for subscription
const subscription = {
  status: "active" as const,
  plan: "pro" as const,
  renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
  paymentMethod: {
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
  },
  invoices: [
    {
      id: "inv_1",
      amount: 29,
      status: "paid",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    },
    {
      id: "inv_2",
      amount: 29,
      status: "paid",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days ago
    },
    {
      id: "inv_3",
      amount: 29,
      status: "paid",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), // 90 days ago
    },
  ],
};

// Helper function for formatting date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BillingPage() {
  const { user } = useAuth();

  // Get plan name
  const getPlanName = (plan: string): string => {
    switch (plan) {
      case "free":
        return "Free Plan";
      case "pro":
        return "Pro Plan";
      case "enterprise":
        return "Enterprise Plan";
      default:
        return "Unknown Plan";
    }
  };

  // Get plan price
  const getPlanPrice = (plan: string): number => {
    switch (plan) {
      case "free":
        return 0;
      case "pro":
        return 29;
      case "enterprise":
        return 99;
      default:
        return 0;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center rounded-full bg-success/20 px-2 py-1 text-xs text-success">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </span>
        );
      case "trialing":
        return (
          <span className="inline-flex items-center rounded-full bg-info/20 px-2 py-1 text-xs text-info">
            <Clock className="mr-1 h-3 w-3" /> Trial
          </span>
        );
      case "past_due":
        return (
          <span className="inline-flex items-center rounded-full bg-warning/20 px-2 py-1 text-xs text-warning">
            <AlertCircle className="mr-1 h-3 w-3" /> Past Due
          </span>
        );
      case "canceled":
        return (
          <span className="inline-flex items-center rounded-full bg-destructive/20 px-2 py-1 text-xs text-destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Canceled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
            Unknown
          </span>
        );
    }
  };

  // Update page title
  useEffect(() => {
    document.title = "Billing & Subscription - SaaSApp";
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Manage your subscription and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{getPlanName(subscription.plan)}</h3>
                <p className="text-sm text-muted-foreground">
                  ${getPlanPrice(subscription.plan)}/month
                </p>
              </div>
              <div>{getStatusBadge(subscription.status)}</div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Your subscription will renew on:
              </p>
              <p className="flex items-center font-medium">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {formatDate(subscription.renewalDate)}
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Manage your payment details and billing address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-muted p-2">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">
                  {subscription.paymentMethod.brand.toUpperCase()} ending in{" "}
                  {subscription.paymentMethod.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {subscription.paymentMethod.expMonth}/
                  {subscription.paymentMethod.expYear}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Update Payment Method</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b bg-muted px-4 py-2 text-sm font-medium">
              <div>Date</div>
              <div>Invoice ID</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {subscription.invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-4 border-b px-4 py-3 text-sm last:border-0"
              >
                <div>{formatDate(invoice.date)}</div>
                <div>{invoice.id}</div>
                <div>${invoice.amount.toFixed(2)}</div>
                <div>
                  {invoice.status === "paid" ? (
                    <span className="inline-flex items-center rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-warning/20 px-2 py-1 text-xs text-warning">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
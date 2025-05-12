import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { PricingTier } from "@/types";

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals getting started",
    price: 0,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "24-hour support response time",
      "1 GB storage",
      "Community access"
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and small teams",
    price: 29,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "20 GB storage",
      "API access",
      "Collaboration tools",
      "Custom integrations"
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    features: [
      "Everything in Pro",
      "Unlimited users",
      "1-hour support response time",
      "100 GB storage",
      "Priority support",
      "Custom reporting",
      "Dedicated account manager",
      "SSO & advanced security"
    ],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);
  
  const getAdjustedPrice = (price: number) => {
    if (price === 0) return 0;
    return annual ? price * 10 : price;
  };

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-heading">Simple, Transparent Pricing</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for you and your team. All plans include a 14-day trial.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={`text-sm ${!annual ? "font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary/20 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
            >
              <span className="sr-only">Use annual billing</span>
              <span
                aria-hidden="true"
                className={`${
                  annual ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary shadow ring-0 transition duration-200 ease-in-out`}
              ></span>
            </button>
            <span className={`text-sm ${annual ? "font-medium" : "text-muted-foreground"}`}>
              Annual <span className="rounded bg-success/10 px-1.5 py-0.5 text-xs text-success">Save 20%</span>
            </span>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              className={`relative rounded-xl border ${
                tier.highlighted
                  ? "border-primary/30 bg-primary/5 shadow-md"
                  : "border-border bg-card shadow-sm"
              } overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {tier.highlighted && (
                <div className="absolute -right-10 top-5 w-40 rotate-45 bg-primary py-1 text-center text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">
                    ${getAdjustedPrice(tier.price)}
                  </span>
                  <span className="ml-1 text-base text-muted-foreground">
                    {tier.price > 0 ? (annual ? "/year" : "/month") : ""}
                  </span>
                </p>
                
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link to="/signup">
                    <Button
                      variant={tier.highlighted ? "gradient" : "outline"}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
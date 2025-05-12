import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQ } from "@/types";

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is included in the free trial?",
    answer:
      "The 14-day free trial includes all features of the Pro plan. No credit card is required to start, and you can cancel anytime before the trial ends without being charged.",
    category: "billing",
  },
  {
    id: "2",
    question: "How secure is my data on your platform?",
    answer:
      "We take security seriously. Your data is encrypted in transit and at rest. We use industry-standard security practices, regular security audits, and provide two-factor authentication for all accounts.",
    category: "security",
  },
  {
    id: "3",
    question: "Can I change my subscription plan later?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your plan will take effect at the start of your next billing cycle.",
    category: "billing",
  },
  {
    id: "4",
    question: "Do you offer integrations with other tools?",
    answer:
      "We offer integrations with popular tools like Slack, Google Workspace, Microsoft 365, Zapier, and more. We also provide a robust API for custom integrations.",
    category: "features",
  },
  {
    id: "5",
    question: "What kind of support do you offer?",
    answer:
      "All plans include email support with varying response times based on your plan. Pro and Enterprise plans include priority support with faster response times. Enterprise plans also include a dedicated account manager.",
    category: "support",
  },
  {
    id: "6",
    question: "Can I export my data if I decide to leave?",
    answer:
      "Yes, we provide easy data export options for all your information. You can export to common formats like CSV and JSON, ensuring you always maintain ownership of your data.",
    category: "features",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-heading">Frequently Asked Questions</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find answers to common questions about our platform, pricing, and support.
          </motion.p>
        </div>

        <motion.div 
          className="mt-16 mx-auto max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`rounded-lg border ${
                openId === faq.id
                  ? "border-primary/30 bg-card shadow-md"
                  : "border-border bg-card"
              } transition-all duration-200`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={openId === faq.id}
              >
                <h3 className="font-medium">{faq.question}</h3>
                {openId === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96 pb-6 px-6" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 rounded-lg border border-border bg-card/50 p-8 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="mt-2 text-muted-foreground">
            We're here to help. Contact our friendly support team.
          </p>
          <div className="mt-4">
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Zap, 
  Lock, 
  RefreshCw, 
  Globe, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with comprehensive data visualization and reporting tools.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Lightning Fast",
    description:
      "Built for speed and performance to help your team work more efficiently.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption and two-factor authentication.",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Seamless Integration",
    description:
      "Connect with your favorite tools and services with our extensive API.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Global Availability",
    description:
      "Deployed across multiple regions for fast access no matter where you are.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "AI-Powered",
    description:
      "Leverage machine learning to automate tasks and uncover hidden opportunities.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/40 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-heading">Powerful Features</span>
            <br />for Your Business
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our comprehensive toolset is designed to help your team work
            smarter, not harder. Explore the features that set us apart.
          </motion.p>
        </div>

        <motion.div 
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group rounded-lg border border-border/60 bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-app"
              variants={item}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
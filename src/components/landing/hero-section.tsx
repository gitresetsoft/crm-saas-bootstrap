import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 wavy-pattern opacity-50"></div>
      <div className="absolute inset-0 -z-10 aurora-bg dark:aurora-bg-dark"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-heading">Accelerate Your Business</span>
            <br />with Our SaaS Solution
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Streamline operations, boost productivity, and unlock insights 
            with our all-in-one platform built for modern businesses.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/signup">
              <Button size="lg" variant="gradient" className="px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>
        
        {/* Dashboard preview */}
        <motion.div 
          className="mt-16 rounded-lg border border-border/40 bg-card/80 p-2 shadow-app"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
            {/* Mockup image would go here */}
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-background/80 to-muted p-8">
              <div className="grid w-full max-w-5xl grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  <div className="h-8 w-32 rounded-md bg-primary/20"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-md bg-primary/10"></div>
                    <div className="h-24 rounded-md bg-secondary/10"></div>
                    <div className="h-24 rounded-md bg-accent/10"></div>
                  </div>
                  <div className="h-64 rounded-md bg-muted-foreground/10"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-full rounded-md bg-primary/20"></div>
                  <div className="h-40 rounded-md bg-muted-foreground/10"></div>
                  <div className="h-40 rounded-md bg-muted-foreground/5"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
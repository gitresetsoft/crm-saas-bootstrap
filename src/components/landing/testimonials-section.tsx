import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import type { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "Growth Co.",
    testimonial:
      "This platform has transformed our marketing workflows. The analytics features alone saved us countless hours of manual reporting. I can't imagine running our campaigns without it now.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: "2",
    name: "Alex Chen",
    title: "CTO",
    company: "TechStart Inc.",
    testimonial:
      "As a tech company, we have high standards for the tools we use. This solution exceeded our expectations with its robust API, seamless integrations, and enterprise-grade security.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    title: "Operations Manager",
    company: "Logistics Plus",
    testimonial:
      "The automation capabilities have reduced our processing time by 40%. What used to take days now happens in hours. The ROI was apparent within the first month.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: "4",
    name: "David Parker",
    title: "CEO",
    company: "Innovate Partners",
    testimonial:
      "After trying multiple solutions, we finally found one that our entire team loves to use. The intuitive design and powerful features make it our go-to platform for project management.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(next, 5000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="bg-muted/40 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-heading">What Our Customers Say</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Don't just take our word for it — hear from some of our
            satisfied customers who have transformed their businesses.
          </motion.p>
        </div>

        <div 
          className="relative mt-16 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative mx-auto max-w-4xl">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-card p-8 shadow-app md:p-12"
            >
              <div className="mb-6 flex justify-center md:mb-8">
                <Quote className="h-12 w-12 text-primary/30 md:h-16 md:w-16" />
              </div>
              
              <blockquote className="mb-8 text-center text-lg md:text-xl">
                "{testimonials[current].testimonial}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <Avatar 
                  src={testimonials[current].avatar} 
                  alt={testimonials[current].name}
                  size="lg"
                  className="mb-3"
                />
                <div className="text-center">
                  <p className="font-semibold">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].title}, {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-2 rounded-full ${
                      i === current ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
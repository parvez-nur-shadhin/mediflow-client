"use client";

import { motion } from "framer-motion";
import { FaMobileAlt, FaBoxOpen, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaMobileAlt />,
      title: "Order Online",
      desc: "Search for your required medicines and add them to your cart."
    },
    {
      icon: <FaBoxOpen />,
      title: "We Pack It",
      desc: "Our pharmacists verify and securely pack your authentic medicines."
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "Get your order delivered directly to your doorstep within hours."
    }
  ];

  return (
    <div className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">How Mediflow Works</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center max-w-xs bg-base-200"
            >
              <div className="w-24 h-24 bg-primary text-primary-content rounded-full flex items-center justify-center text-4xl shadow-xl shadow-primary/30 mb-6 border-4 border-base-200">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-base-content/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
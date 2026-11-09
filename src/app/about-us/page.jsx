"use client";

import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaShippingFast,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";
import Link from "next/link";

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      title: "Active Customers",
      value: "10k+",
      desc: "Trust Mediflow daily",
    },
    {
      id: 2,
      title: "Verified Medicines",
      value: "5000+",
      desc: "From top manufacturers",
    },
    { id: 3, title: "Cities Covered", value: "64", desc: "Across Bangladesh" },
  ];

  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-4xl text-primary mb-4" />,
      title: "100% Genuine Medicines",
      description:
        "We source directly from authorized manufacturers and distributors to ensure authenticity.",
    },
    {
      id: 2,
      icon: <FaShippingFast className="text-4xl text-primary mb-4" />,
      title: "Fast & Reliable Delivery",
      description:
        "Get your essential medicines delivered to your doorstep swiftly and securely.",
    },
    {
      id: 3,
      icon: <FaHeartbeat className="text-4xl text-primary mb-4" />,
      title: "Healthcare First",
      description:
        "Your health is our priority. We maintain strict quality control for all our products.",
    },
    {
      id: 4,
      icon: <FaUserMd className="text-4xl text-primary mb-4" />,
      title: "Expert Support",
      description:
        "Our dedicated support team and registered pharmacists are here to assist you.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
            Simplifying <span className="text-primary">Healthcare</span> for You
          </h1>
          <p className="text-lg text-base-content/70">
            Mediflow was founded with a single mission: to make healthcare
            accessible, affordable, and highly reliable. We bridge the gap
            between you and the authentic medicines you need.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="stats shadow bg-base-100 w-full rounded-2xl border border-base-300"
            >
              <div className="stat text-center py-8">
                <div className="stat-title text-base-content/60 font-semibold">
                  {stat.title}
                </div>
                <div className="stat-value text-primary text-4xl my-2">
                  {stat.value}
                </div>
                <div className="stat-desc text-sm font-medium">{stat.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Why Choose Mediflow?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="card-body items-center text-center p-8">
                  {feature.icon}
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="bg-primary text-primary-content rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
            <FaHeartbeat className="text-9xl" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to prioritize your health?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who trust Mediflow for their
              daily medical needs. Explore our extensive catalog of authentic
              medicines today.
            </p>
            <Link
              href="/browse-medicines"
              className="btn btn-base-100 btn-lg rounded-full text-primary font-bold border-none shadow-lg px-10"
            >
              Browse Medicines
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

"use client";

import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaCheck } from "react-icons/fa";

const TrustStats = () => {
  const stats = [
    { icon: <FaUsers />, value: "50,000+", label: "Happy Customers" },
    { icon: <FaCheck />, value: "100,000+", label: "Orders Delivered" },
    { icon: <FaBuilding />, value: "500+", label: "Partner Pharmacies" },
  ];

  return (
    <div className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body flex flex-row items-center gap-6 p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-base-content">{stat.value}</h3>
                  <p className="text-base-content/60 font-medium mt-1">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStats;
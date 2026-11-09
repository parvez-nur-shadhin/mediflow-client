"use client";

import { motion } from "framer-motion";
import { FaSyringe, FaVial, FaBandAid, FaBaby, FaHeartbeat, FaCapsules } from "react-icons/fa";
import Link from "next/link";

const FeaturedCategories = () => {
  const categories = [
    { name: "Tablets", icon: <FaCapsules />, color: "bg-blue-100 text-blue-600" },
    { name: "Injections", icon: <FaSyringe />, color: "bg-red-100 text-red-600" },
    { name: "Syrups", icon: <FaVial />, color: "bg-purple-100 text-purple-600" },
    { name: "First Aid", icon: <FaBandAid />, color: "bg-orange-100 text-orange-600" },
    { name: "Baby Care", icon: <FaBaby />, color: "bg-pink-100 text-pink-600" },
    { name: "Supplements", icon: <FaHeartbeat />, color: "bg-green-100 text-green-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">Shop by Category</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link 
                href={`/browse-medicines?category=${cat.name}`}
                className="flex flex-col items-center justify-center p-6 bg-base-200 rounded-3xl hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer border border-transparent hover:border-primary/20 group"
              >
                <div className={`text-4xl p-5 rounded-full mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-base-content text-center">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
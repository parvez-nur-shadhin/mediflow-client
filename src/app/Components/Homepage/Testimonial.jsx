"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Hossain",
      role: "Regular Customer",
      text: "Mediflow has completely changed how I buy medicines for my parents. The delivery is always on time, and the medicines are 100% authentic.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sadia Rahman",
      role: "Verified Buyer",
      text: "I love the user interface! It's so easy to find what I need. The stock is always updated, and the prices are very reasonable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dr. Kamal Uddin",
      role: "Healthcare Professional",
      text: "I frequently recommend Mediflow to my patients. Their strict quality control and reliable delivery system make them highly trustworthy.",
      rating: 4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full opacity-80"></div>
          <p className="mt-6 text-base-content/70 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Read how Mediflow is making healthcare easier and more accessible for thousands of people.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="card bg-base-200/50 hover:bg-base-200 transition-colors border border-base-300 shadow-sm hover:shadow-xl relative overflow-hidden group"
            >
              <FaQuoteLeft className="absolute -top-4 -right-4 text-7xl text-base-300 opacity-50 group-hover:text-primary/10 transition-colors" />
              
              <div className="card-body relative z-10 p-8">
                <div className="flex gap-1 mb-4 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-warning" : "text-base-300"} />
                  ))}
                </div>
                
                <p className="text-base-content/80 text-lg leading-relaxed italic mb-8">
                  "{review.text}"
                </p>
                
                <div className="mt-auto flex items-center gap-4">
                  <FaUserCircle className="text-5xl text-base-content/20" />
                  <div>
                    <h4 className="font-bold text-base-content text-lg leading-none mb-1">
                      {review.name}
                    </h4>
                    <p className="text-sm text-base-content/60">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
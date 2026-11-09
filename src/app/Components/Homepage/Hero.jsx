"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaTruck, FaHeartbeat, FaArrowRight, FaPills } from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="relative bg-base-200 overflow-hidden min-h-[85vh] flex items-center py-16 lg:py-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 z-0"></div>
      
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-3xl rounded-full mix-blend-multiply opacity-60"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 blur-3xl rounded-full mix-blend-multiply opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm sm:text-base border border-primary/20 shadow-sm">
              <FaShieldAlt className="text-lg" /> 100% Verified & Authentic
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-base-content leading-[1.1] tracking-tight">
                Your Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Delivered Fast.
                </span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <p className="text-base sm:text-lg text-base-content/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Order your essential medicines from the comfort of your home. We ensure secure, fast, and reliable delivery right to your doorstep within 24 hours.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <Link href="/browse-medicines" className="btn btn-primary btn-lg rounded-full text-white shadow-lg shadow-primary/30 w-full sm:w-auto px-8 group">
                Browse Medicines
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about-us" className="btn btn-outline btn-lg rounded-full w-full sm:w-auto px-8 border-base-300 hover:border-primary hover:bg-primary/5 hover:text-primary">
                Learn More
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 mt-6 text-base-content/60 font-medium text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <FaTruck className="text-primary text-xl" /> Free Delivery Available
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-primary text-xl" /> Secure Checkout
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center relative mt-10 lg:mt-0"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/20 rounded-full absolute blur-3xl"
            ></motion.div>
            
            <div className="relative z-10 bg-base-100 p-10 sm:p-12 lg:p-16 rounded-full shadow-2xl border-[6px] sm:border-[8px] border-base-200">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeartbeat className="text-8xl sm:text-[10rem] lg:text-[12rem] text-primary drop-shadow-xl" />
              </motion.div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 sm:top-10 left-4 sm:left-10 lg:-left-4 bg-base-100 p-3 sm:p-4 rounded-2xl shadow-xl border border-base-200 z-20"
            >
              <FaShieldAlt className="text-3xl sm:text-4xl text-success" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 lg:-right-4 bg-base-100 p-3 sm:p-4 rounded-2xl shadow-xl border border-base-200 z-20"
            >
              <FaTruck className="text-3xl sm:text-4xl text-secondary" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-1/2 -right-4 sm:-right-8 lg:-right-12 bg-base-100 p-3 sm:p-4 rounded-2xl shadow-xl border border-base-200 z-20"
            >
              <FaPills className="text-3xl sm:text-4xl text-accent" />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
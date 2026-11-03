"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHouseMedical, FaHeartCrack, FaPills } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-base-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-lg"
      >
        {/* Floating Medical Icon */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative text-error mb-6"
        >
          <FaHeartCrack className="text-8xl md:text-9xl drop-shadow-xl" />
          <FaPills className="text-4xl text-secondary absolute -bottom-2 -right-4 drop-shadow-md" />
        </motion.div>

        {/* 404 Text */}
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 drop-shadow-sm">
          404
        </h1>

        {/* Message Card */}
        <div className="bg-base-200 border border-base-300 px-6 py-5 rounded-2xl shadow-sm mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2">
            Prescription Not Found
          </h2>
          <p className="text-base-content/70 text-base md:text-lg leading-relaxed">
            Oops! It looks like the page you are looking for has been moved, deleted, or doesn't exist in our dispensary.
          </p>
        </div>

        {/* Action Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href="/" 
            className="btn btn-primary rounded-full px-8 h-14 text-white shadow-lg shadow-primary/30 flex items-center gap-2 text-lg"
          >
            <FaHouseMedical className="text-xl" />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
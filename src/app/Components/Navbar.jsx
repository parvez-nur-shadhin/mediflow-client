"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaHeartbeat } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
// import { FaHeartbeat, FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Medicines", href: "/browse-medicines" },
    { name: "My Cart", href: "/my-cart"},
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8 lg:px-12">
      {/* Logo & Mobile Menu Toggle */}
      <div className="navbar-start w-full lg:w-1/3 justify-between lg:justify-start">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-2xl font-bold text-primary cursor-pointer"
          >
            <FaHeartbeat className="text-3xl text-secondary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Mediflow
            </span>
          </motion.div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost lg:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex w-1/3 justify-center">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="font-medium text-base-content hover:text-primary transition-colors rounded-lg"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Action Button (Desktop) */}
      <div className="navbar-end hidden lg:flex w-1/3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="btn btn-primary rounded-full px-8 text-white shadow-md shadow-primary/30">
            Sign In
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-base-100 shadow-lg lg:hidden flex flex-col p-4 border-t border-base-200"
          >
            <ul className="menu menu-vertical gap-2 w-full">
              {navLinks.map((link, index) => (
                <li key={index} onClick={() => setIsOpen(false)}>
                  <Link
                    href={link.href}
                    className="font-medium text-lg justify-center py-3"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary w-full mt-4 text-white rounded-full">
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
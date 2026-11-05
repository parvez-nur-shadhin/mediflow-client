"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaHeartbeat, FaUserCircle } from "react-icons/fa";
import { FaXmark, FaArrowRightFromBracket } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/", showAlways: true },
    { name: "Browse Medicines", href: "/browse-medicines", showAlways: true },
    { name: "Add Medicines", href: "/add-medicines", requiredUser: true },
    { name: "My Cart", href: "/my-cart", requireAuth: true },
    { name: "About Us", href: "/about-us", showAlways: true },
    { name: "Contact", href: "/contact", showAlways: true },
  ].filter(
    (link) =>
      link.showAlways ||
      (link.requireAuth && user) ||
      (link.requiredUser && user?.role == "seller"),
  );

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8 lg:px-12">
      
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

        <button
          className="btn btn-ghost lg:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      
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

      
      <div className="navbar-end hidden lg:flex w-1/3">
        {isPending ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-full flex items-center gap-2 px-4 hover:bg-base-200"
            >
              <FaUserCircle className="text-2xl text-primary" />
              <span className="font-semibold">{user.name}</span>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-error font-medium flex items-center gap-2"
                >
                  <FaArrowRightFromBracket /> Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={"/sign-in"}>
              <button className="btn btn-primary rounded-full px-8 text-white shadow-md shadow-primary/30">
                Sign In
              </button>
            </Link>
          </motion.div>
        )}
      </div>

      
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

            
            <div className="mt-4 pt-4 border-t border-base-200 flex flex-col gap-3">
              {isPending ? (
                <span className="loading loading-spinner mx-auto text-primary"></span>
              ) : user ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-lg font-semibold text-base-content">
                    <FaUserCircle className="text-2xl text-primary" />
                    {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="btn btn-outline btn-error w-full rounded-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <button className="btn btn-primary w-full text-white rounded-full">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

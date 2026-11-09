"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaHeartbeat, FaUserCircle } from "react-icons/fa";
import { FaXmark, FaArrowRightFromBracket } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      (link.requiredUser && user?.role === "seller"),
  );

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-base-100/90 backdrop-blur-lg shadow-sm" : "bg-base-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-tr from-primary to-secondary p-2.5 rounded-xl text-white shadow-lg">
                <FaHeartbeat className="text-xl md:text-2xl" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:block tracking-tight">
                Mediflow
              </span>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary ${
                      isActive ? "bg-primary/10 text-primary" : "text-base-content/70"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-base-200 hover:border-primary/30 hover:bg-base-200/50 transition-all"
                >
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8 h-8">
                      <span className="text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold max-w-[120px] truncate">{user.name}</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-56 mt-4 border border-base-200"
                >
                  <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="text-xs text-base-content/60">Signed in as</p>
                    <p className="text-sm font-bold truncate text-base-content">{user.email}</p>
                  </div>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-error hover:bg-error/10 hover:text-error rounded-xl flex items-center gap-3 py-3 font-medium"
                    >
                      <FaArrowRightFromBracket /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary rounded-full px-8 text-white shadow-lg shadow-primary/30 font-medium"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {user && !isPending && (
              <div className="avatar placeholder sm:hidden mr-2">
                <div className="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span className="text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            )}
            <button
              className="btn btn-ghost btn-circle text-xl text-base-content"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-base-100 border-t border-base-200 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-2 max-w-3xl mx-auto shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.name} href={link.href}>
                    <span
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-base-content/80 hover:bg-base-200 hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-base-200">
                {isPending ? (
                  <div className="flex justify-center p-4">
                    <span className="loading loading-spinner text-primary"></span>
                  </div>
                ) : user ? (
                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                          <span className="font-bold text-lg">{user.name?.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-base-content text-lg leading-tight">{user.name}</p>
                        <p className="text-sm text-base-content/60">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-outline btn-error w-full rounded-full mt-2"
                    >
                      <FaArrowRightFromBracket /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link href="/sign-in" className="block px-2 mt-2">
                    <button className="btn btn-primary w-full rounded-full text-white h-12 text-lg">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
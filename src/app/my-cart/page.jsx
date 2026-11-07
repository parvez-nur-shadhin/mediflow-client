"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const MyCart = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/cart/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, isPending]);

  const updateQuantity = async (id, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    setActionLoading(id);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty, quanitiy: newQty }),
      });

      if (res.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, quanitiy: newQty, quantity: newQty }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  const removeItem = async (id) => {
    setActionLoading(id);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/cart/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckout = async () => {
    alert("Proceeding to secure checkout!");
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4 px-4 text-center">
        <FaShoppingCart className="text-6xl text-base-300" />
        <h2 className="text-2xl font-bold">Sign in to view your cart</h2>
        <Link
          href="/sign-in"
          className="btn btn-primary rounded-full px-8 text-white mt-2"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const qty = item.quantity || item.quanitiy || 1;
      return total + item.medicineDetails.price * qty;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingCart className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold text-base-content">My Cart</h1>
          <div className="badge badge-secondary badge-lg font-bold">
            {cartItems.length} Items
          </div>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4 bg-base-100 rounded-3xl shadow-sm border border-base-300 gap-6"
          >
            <div className="p-6 bg-base-200 rounded-full">
              <FaShoppingCart className="text-6xl text-base-content/30" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-base-content/60">
                Looks like you haven't added any medicines yet.
              </p>
            </div>
            <Link
              href="/browse-medicines"
              className="btn btn-primary text-white rounded-full px-8 shadow-md"
            >
              Start Shopping <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence>
                {cartItems.map((item) => {
                  const qty = item.quantity || item.quanitiy || 1;
                  const isLoading = actionLoading === item._id;

                  return (
                    <motion.div
                      layout
                      key={item._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      }}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200"
                    >
                      <div className="card-body p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6">
                        <figure className="w-full sm:w-32 h-32 bg-base-200 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={
                              item.medicineDetails.imageUrl ||
                              "https://via.placeholder.com/150"
                            }
                            alt={item.medicineDetails.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/150")
                            }
                          />
                        </figure>

                        <div className="flex-1 flex flex-col gap-2 w-full text-center sm:text-left">
                          <div>
                            <h2 className="text-xl font-bold text-base-content leading-tight">
                              {item.medicineDetails.name}
                            </h2>
                            <p className="text-sm text-base-content/60 mt-1">
                              {item.medicineDetails.genericName}
                            </p>
                          </div>
                          <div className="badge badge-outline mt-1 mx-auto sm:mx-0">
                            {item.medicineDetails.category}
                          </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-end gap-4 w-full sm:w-auto shrink-0">
                          <div className="text-2xl font-bold text-primary">
                            ৳{(item.medicineDetails.price * qty).toFixed(2)}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex border border-base-300 rounded-full overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, qty, -1)
                                }
                                disabled={qty <= 1 || isLoading}
                                className="btn btn-sm btn-ghost rounded-none border-0"
                              >
                                <FaMinus />
                              </button>
                              <div className="px-4 flex items-center bg-base-100 font-semibold text-lg w-12 justify-center">
                                {qty}
                              </div>
                              <button
                                onClick={() => updateQuantity(item._id, qty, 1)}
                                disabled={isLoading}
                                className="btn btn-sm btn-ghost rounded-none border-0"
                              >
                                <FaPlus />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item._id)}
                              disabled={isLoading}
                              className="btn btn-sm btn-error btn-outline btn-circle shrink-0"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-96 shrink-0"
            >
              <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
                <div className="card-body p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4 border-b border-base-200 pb-4">
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-3 text-lg font-medium text-base-content/80 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>৳{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-success font-bold">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-2xl font-bold text-base-content border-t border-base-200 pt-6 mb-8">
                    <span>Total</span>
                    <span className="text-primary">৳{total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn btn-primary w-full text-lg rounded-full text-white shadow-lg shadow-primary/30 h-14"
                  >
                    <FaCreditCard className="mr-2" /> Pay Out
                  </button>

                  <p className="text-center text-xs text-base-content/50 mt-4">
                    Secure checkout powered by Mediflow
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaCartPlus, FaTag, FaPills } from "react-icons/fa";
import { addToCartPost } from "@/Mutations/PostMethods";
import { authClient } from "@/lib/auth-client";

const BrowseMedicines = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name_asc");

  const categories = [
    "All",
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Drops",
    "Ointment",
    "Other",
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/medicines`);

        if (!res.ok) throw new Error("Failed to fetch medicines");

        const data = await res.json();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    let result = [...medicines];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (med) =>
          med.name.toLowerCase().includes(lowerSearch) ||
          med.genericName.toLowerCase().includes(lowerSearch),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((med) => med.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name_asc") return a.name.localeCompare(b.name);
      if (sortBy === "name_desc") return b.name.localeCompare(a.name);
      return 0;
    });

    setFilteredMedicines(result);
  }, [searchTerm, selectedCategory, sortBy, medicines]);

  const handleAddToCart = async (medicine) => {
    const { userId, _id } = medicine;
    const data = {
      userId: user?.id,
      medicineId: _id,
      quanitiy: 1,
    };
    await addToCartPost(data);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center text-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="bg-base-100 p-4 md:p-6 rounded-2xl shadow-sm border border-base-300 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FaFilter className="text-primary text-xl" />
            <h2 className="text-xl font-bold text-base-content">
              Filter & Search
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control flex-1">
              <label className="input input-bordered flex items-center gap-2">
                <FaSearch className="text-base-content/50" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Search by medicine or generic name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>

            <select
              className="select select-bordered w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full md:w-48"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-base-content/70 font-medium px-2">
          Showing {filteredMedicines.length} result
          {filteredMedicines.length !== 1 ? "s" : ""}
        </div>

        {filteredMedicines.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredMedicines.map((med) => (
                <motion.div
                  key={med._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <figure className="px-4 pt-4 h-48 bg-base-100 flex items-center justify-center">
                    <img
                      src={
                        med.imageUrl ||
                        "https://via.placeholder.com/150?text=No+Image"
                      }
                      alt={med.name}
                      className="object-contain h-full w-full rounded-xl"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/150?text=No+Image")
                      }
                    />
                  </figure>
                  <div className="card-body p-5">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="card-title text-lg leading-tight">
                        {med.name}
                      </h2>
                      <div className="badge badge-secondary badge-sm whitespace-nowrap">
                        {med.category}
                      </div>
                    </div>

                    <div className="text-sm text-base-content/70 mt-1 flex items-center gap-2">
                      <FaPills className="text-primary/50" />
                      {med.genericName}
                    </div>

                    <div className="text-xs text-base-content/50 mt-1 truncate">
                      By {med.manufacturer}
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-xl font-bold text-primary">
                      <FaTag className="text-sm" />৳
                      {parseFloat(med.price).toFixed(2)}
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(med)}
                        disabled={med.stock <= 0}
                        className={`btn w-full rounded-lg ${med.stock > 0 ? "btn-primary" : "btn-disabled"}`}
                      >
                        {med.stock > 0 ? (
                          <>
                            <FaCartPlus className="text-lg" />
                            Add to Cart
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-base-content/50"
          >
            <FaSearch className="text-6xl mb-4 text-base-300" />
            <h3 className="text-xl font-semibold">No medicines found</h3>
            <p>Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseMedicines;

"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaPills,
  FaBuilding,
  FaDollarSign,
  FaBoxes,
  FaCalendarDay,
  FaAlignLeft,
  FaImage,
} from "react-icons/fa";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { addMedicines } from "@/Mutations/PostMethods";
import { userAc } from "better-auth/plugins/admin/access";
import { authClient } from "@/lib/auth-client";

const AddMedicine = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      userId: user?.id,
    };
    addMedicines(newData);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    reset();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-300"
      >
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
            <div className="p-3 bg-primary/10 rounded-xl">
              <FaSuitcaseMedical className="text-3xl text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                Add New Medicine
              </h2>
              <p className="text-base-content/70 text-sm">
                Register a new product into the inventory
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Brand Name</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.name ? "input-error" : ""}`}
                >
                  <FaPills className="text-base-content/50" />
                  <input
                    type="text"
                    placeholder="e.g. Napa Extra"
                    className="grow"
                    {...register("name", { required: "Name is required" })}
                  />
                </label>
                {errors.name && (
                  <span className="text-error text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Generic Name</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.genericName ? "input-error" : ""}`}
                >
                  <FaPills className="text-base-content/50" />
                  <input
                    type="text"
                    placeholder="e.g. Paracetamol"
                    className="grow"
                    {...register("genericName", {
                      required: "Generic name is required",
                    })}
                  />
                </label>
                {errors.genericName && (
                  <span className="text-error text-xs mt-1">
                    {errors.genericName.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Manufacturer</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.manufacturer ? "input-error" : ""}`}
                >
                  <FaBuilding className="text-base-content/50" />
                  <input
                    type="text"
                    placeholder="e.g. Beximco Pharma"
                    className="grow"
                    {...register("manufacturer", {
                      required: "Manufacturer is required",
                    })}
                  />
                </label>
                {errors.manufacturer && (
                  <span className="text-error text-xs mt-1">
                    {errors.manufacturer.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.category ? "select-error" : ""}`}
                  {...register("category", {
                    required: "Category is required",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                  <option value="Drops">Drops</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <span className="text-error text-xs mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Price (৳)</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.price ? "input-error" : ""}`}
                >
                  <FaDollarSign className="text-base-content/50" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="grow"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                  />
                </label>
                {errors.price && (
                  <span className="text-error text-xs mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Initial Stock</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.stock ? "input-error" : ""}`}
                >
                  <FaBoxes className="text-base-content/50" />
                  <input
                    type="number"
                    placeholder="100"
                    className="grow"
                    {...register("stock", {
                      required: "Stock is required",
                      min: { value: 0, message: "Stock cannot be negative" },
                    })}
                  />
                </label>
                {errors.stock && (
                  <span className="text-error text-xs mt-1">
                    {errors.stock.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Expiry Date</span>
                </label>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.expiryDate ? "input-error" : ""}`}
                >
                  <FaCalendarDay className="text-base-content/50" />
                  <input
                    type="date"
                    className="grow"
                    {...register("expiryDate", {
                      required: "Expiry date is required",
                    })}
                  />
                </label>
                {errors.expiryDate && (
                  <span className="text-error text-xs mt-1">
                    {errors.expiryDate.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Image URL (Optional)
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-3">
                  <FaImage className="text-base-content/50" />
                  <input
                    type="url"
                    placeholder="https://..."
                    className="grow"
                    {...register("imageUrl")}
                  />
                </label>
              </div>
            </div>

            <div className="form-control w-full mt-2">
              <label className="label py-1">
                <span className="label-text font-medium">Description</span>
              </label>
              <div className="relative">
                <FaAlignLeft className="absolute top-4 left-4 text-base-content/50" />
                <textarea
                  className="textarea textarea-bordered w-full pl-10 pt-3"
                  placeholder="Enter medicine details, usage instructions, or side effects..."
                  rows="4"
                  {...register("description")}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-base-200">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full md:w-48 text-white rounded-lg shadow-md shadow-primary/30"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Save Medicine"
                  )}
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddMedicine;

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { confirmPassword, ...submitData } = data;

    const { data: res, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email, 
      password: data.password,
    });
    router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-base-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300"
      >

        <div className="card-body">
          <div className="text-center mb-6">
            <FaHeartbeat className="text-4xl text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-base-content">
              Create an Account
            </h2>
            <p className="text-base-content/70 text-sm">Join Mediflow today</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-3 ${errors.name ? "input-error" : ""}`}
              >
                <FaUser className="text-base-content/50" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="grow"
                  {...register("name", { required: "Full name is required" })}
                />
              </label>
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-3 ${errors.email ? "input-error" : ""}`}
              >
                <FaEnvelope className="text-base-content/50" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="grow"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

   
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Password</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-3 ${errors.password ? "input-error" : ""}`}
              >
                <FaLock className="text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="grow"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/50 hover:text-base-content focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-3 ${errors.confirmPassword ? "input-error" : ""}`}
              >
                <FaLock className="text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="grow"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
              </label>
              {errors.confirmPassword && (
                <span className="text-error text-xs mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-white rounded-lg shadow-md shadow-primary/30"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </motion.div>
          </form>

          <div className="text-center mt-4 text-sm">
            <span className="text-base-content/70">
              Already have an account?{" "}
            </span>
            <Link
              href={"/sign-in"}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

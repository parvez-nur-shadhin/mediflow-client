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
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    const { data:res, error } = await authClient.signIn.email({
      email: data.email, 
      password: data.password, 
      rememberMe: true, 
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
              Welcome Back
            </h2>
            <p className="text-base-content/70 text-sm">
              Sign in to your Mediflow account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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

            {/* Password */}
            <div className="form-control w-full">
              <div className="label py-1">
                <span className="label-text font-medium">Password</span>
                <Link
                  href="/forgot-password"
                  className="label-text-alt text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
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

            {/* Submit Button */}
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
                  "Sign In"
                )}
              </button>
            </motion.div>
          </form>

          <div className="text-center mt-4 text-sm">
            <span className="text-base-content/70">
              Don't have an account?{" "}
            </span>
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { signupUser } from "../services/api"; // Import signupUser API
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

// Validation Schema using Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  identifier: yup.string().required("Please provide an email or phone"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
}).required();

const SignupForm = () => {
  const [selectedField, setSelectedField] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: selectedField === "email" ? data.identifier : "",
      phone: selectedField === "phone" ? data.identifier : "",
      password: data.password,
    };

    try {
      const response = await signupUser(payload);
      toast.success("Signup Successful!");
      console.log(response);

      // Optionally, you can store the token or redirect the user
      localStorage.setItem("authToken", response.token);
      // navigate("/login"); // Uncomment if using react-router for navigation

    } catch (error) {
      toast.error(error || "Signup failed");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-pink-100"></div>

      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Create Account</h2>

            {/* Name Input */}
            <div>
              <input
                type="text"
                {...register("name")}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder="Full Name"
              />
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            </div>

            {/* Mail and Phone Icons Centered */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                type="button"
                className={`p-4 rounded-full ${selectedField === "email" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                onClick={() => setSelectedField("email")}
              >
                <FaEnvelope />
              </button>
              <button
                type="button"
                className={`p-4 rounded-full ${selectedField === "phone" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                onClick={() => setSelectedField("phone")}
              >
                <FaPhoneAlt />
              </button>
            </div>

            {/* Dynamic Identifier Input */}
            <div className="mt-4">
              <input
                {...register("identifier")}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${selectedField}`}
              />
              <p className="text-red-500 text-sm mt-1">{errors.identifier?.message}</p>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm Password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;

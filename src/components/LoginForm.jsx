import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../services/api";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

// Validation Schema for Login
const schema = yup
  .object({
    identifier: yup.string().required("Please provide an email or phone"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

const LoginForm = () => {
  const [selectedField, setSelectedField] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      email: selectedField === "email" ? data.identifier : "",
      phone: selectedField === "phone" ? data.identifier : "",
      password: data.password,
    };

    setIsLoading(true);
    try {
      const response = await axios.post("/auth/login", payload);
      toast.success("Login Successful!");

      console.log(response.data); // Handle response (e.g., save token)

      // Add a delay before redirecting
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-pink-100"></div>

      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

            {/* Email or Phone Selector */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                type="button"
                aria-label="Select Email Login"
                className={`p-4 rounded-full ${
                  selectedField === "email" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setSelectedField("email")}
              >
                <FaEnvelope />
              </button>
              <button
                type="button"
                aria-label="Select Phone Login"
                className={`p-4 rounded-full ${
                  selectedField === "phone" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setSelectedField("phone")}
              >
                <FaPhoneAlt />
              </button>
            </div>

            {/* Identifier Input */}
            <div>
              <input
                {...register("identifier")}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${selectedField}`}
                aria-label={`Enter your ${selectedField}`}
              />
              <p className="text-red-500 text-sm mt-1">{errors.identifier?.message}</p>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="Password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

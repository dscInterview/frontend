import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import { FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

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

  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: selectedField === "email" ? data.identifier : "",
      phone: selectedField === "phone" ? data.identifier : "",
      password: data.password,
    };

    try {
      console.log("Yo Bro")
      const response = await signupUser(payload);
      console.log("Im in try block");
      toast.success("Signup Successful!");

      
      setTimeout(() => {
        navigate("/login");  
      }, 2000);  
    } catch (error) {
      console.log("Im in catch block")
      toast.error(error?.response?.data?.message || "Signup failed!");  
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0d0d0d]"></div>

      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105" style={{ backgroundColor: "var(--object-bg)" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--text-color)" }}>Create Account</h2>

            <div>
              <input
                type="text"
                {...register("name")}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Full Name"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
              />
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                type="button"
                aria-label="Select Email Login"
                className={`p-4 rounded-full ${selectedField === "email" ? "bg-gray-600 text-white" : "border-2 border-gray-300 bg-transparent text-gray-200"} hover:bg-gray-600 hover:text-white transition-all duration-300`}
                onClick={() => setSelectedField("email")}
              >
                <FaEnvelope className={`${selectedField === "email" ? "text-white" : "text-gray-200"}`} />
              </button>
              <button
                type="button"
                aria-label="Select Phone Login"
                className={`p-4 rounded-full ${selectedField === "phone" ? "bg-gray-600 text-white" : "border-2 border-gray-300 bg-transparent text-gray-200"} hover:bg-gray-600 hover:text-white transition-all duration-300`}
                onClick={() => setSelectedField("phone")}
              >
                <FaPhoneAlt className={`${selectedField === "phone" ? "text-white" : "text-gray-200"}`} />
              </button>
            </div>

            <div className="mt-4">
              <input
                {...register("identifier")}
                type="text"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder={`Enter your ${selectedField}`}
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
              />
              <p className="text-red-500 text-sm mt-1">{errors.identifier?.message}</p>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                  placeholder="Password"
                  style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-200" /> : <FaEye className="text-gray-200" />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-200" /> : <FaEye className="text-gray-200" />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-transparent text-gray-200 border-2 border-gray-600 hover:bg-gray-600 hover:text-white rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SignupForm;

import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  function handleRegister(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((apiResponse) => {
        setApiError(apiResponse?.response?.data?.message);
        setIsLoading(false);
      });
  }

  let validateSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name can't be longer than 20 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password can't be longer than 15 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-5 py-20">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Register Now</h2>
        {apiError && <div className="p-4 mb-4 text-sm text-red-800 bg-red-200 rounded-lg">{apiError}</div>}
        <form onSubmit={formik.handleSubmit}>
          {['name', 'email', 'phone'].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 font-medium capitalize">{field}</label>
              <input
                type={field}
                name={field}
                placeholder={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors[field] && formik.touched[field] && (
                <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
              )}
            </div>
          ))}
          {['password', 'rePassword'].map((field, index) => (
            <div key={index} className="mb-4 relative">
              <label className="block text-gray-800 dark:text-gray-200 font-medium capitalize">
                {field === "rePassword" ? "Confirm Password" : "Password"}
              </label>
              <input
                type={(field === "password" && !showPassword) || (field === "rePassword" && !showRePassword) ? "password" : "text"}
                name={field}
                placeholder={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
                onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowRePassword(!showRePassword)}
              >
                <i className={`fas fa-eye${(field === "password" && showPassword) || (field === "rePassword" && showRePassword) ? "-slash" : ""}`}></i>
              </span>
              {formik.errors[field] && formik.touched[field] && (
                <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
              )}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
            </button>
            <span className="font-semibold mx-10">
              <Link to="/login" className="hover:text-blue-500 hover:underline text-blue-800 dark:text-blue-400">Login Now</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

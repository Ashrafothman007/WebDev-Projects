import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  let navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === "success") {
          setToken(apiResponse.data.token);
          localStorage.setItem("token", apiResponse.data.token);
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
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password can't be longer than 15 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100 dark:bg-gray-900 p-4">
      <div className="container max-w-lg mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">
          <h2 className="text-4xl font-bold text-blue-600 dark:text-gray-300 mb-6 text-center">Login Now</h2>

          {apiError && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg dark:bg-red-900 dark:text-red-300">
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Your Email"
                className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-800 dark:text-gray-300 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder="Enter Your Password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
              </span>
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-blue-600 dark:bg-gray-700 hover:bg-blue-700 dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-500 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              <span className="font-semibold mx-10">
                <Link to="/register" className="hover:text-blue-500 hover:underline text-blue-800 dark:text-gray-400">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

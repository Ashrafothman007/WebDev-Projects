import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form data:', values);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        resetForm();
      }, 2000);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4 transition-colors duration-300">
      <form 
        onSubmit={formik.handleSubmit} 
        className="w-full max-w-lg p-8 shadow-2xl rounded-2xl bg-gray-100 dark:bg-gray-800 mx-4 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Contact Us
        </h2>

        {submitted && (
          <p className="text-blue-600 dark:text-blue-400 text-center mb-4">
            ✅ Message sent successfully!
          </p>
        )}

        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            className="w-full p-3 border border-blue-400 dark:border-blue-500 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300 text-gray-800 dark:text-white"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <label 
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
          >
            Name
          </label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-blue-400 dark:border-blue-500 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300 text-gray-800 dark:text-white"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label 
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative mb-6">
          <textarea
            name="message"
            className="w-full p-3 border border-blue-400 dark:border-blue-500 bg-transparent rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none peer transition-all duration-300 text-gray-800 dark:text-white"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          <label 
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
          >
            Message
          </label>
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-sm">{formik.errors.message}</p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

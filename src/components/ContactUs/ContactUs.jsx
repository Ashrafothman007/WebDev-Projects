import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactUs = () => {
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
    onSubmit: values => {
      console.log('Form data:', values);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-gray-900 p-4 transition-all duration-700">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg p-8 shadow-2xl rounded-2xl bg-white dark:bg-gray-800 mx-4 transition-all duration-700">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-gray-300 mb-6 text-center transition-all duration-700">Contact Us</h2>

        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            placeholder=" "
            className="w-full p-3 border border-blue-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-400 peer transition-all duration-300 bg-transparent text-gray-900 dark:text-gray-200"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-gray-300 peer-valid:top-0 peer-valid:text-xs peer-valid:text-blue-500 dark:peer-valid:text-gray-300">
            Name
          </label>
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
        </div>

        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            placeholder=" "
            className="w-full p-3 border border-blue-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-400 peer transition-all duration-300 bg-transparent text-gray-900 dark:text-gray-200"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-gray-300 peer-valid:top-0 peer-valid:text-xs peer-valid:text-blue-500 dark:peer-valid:text-gray-300">
            Email
          </label>
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
        </div>

        <div className="relative mb-6">
          <textarea
            name="message"
            placeholder=" "
            className="w-full p-3 border border-blue-300 dark:border-gray-600 rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-400 resize-none peer transition-all duration-300 bg-transparent text-gray-900 dark:text-gray-200"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-gray-300 peer-valid:top-0 peer-valid:text-xs peer-valid:text-blue-500 dark:peer-valid:text-gray-300">
            Message
          </label>
          {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm">{formik.errors.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 dark:bg-gray-700 text-white py-3 rounded-2xl hover:bg-blue-600 dark:hover:bg-gray-600 transition-all duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* عنوان الصفحة */}
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
          About Us
        </h1>

        {/* فقرة المقدمة */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Welcome to our leading e-commerce platform where quality meets convenience. 
          Our mission is to deliver an unparalleled shopping experience with a vast range of products, 
          competitive pricing, and exceptional customer service. We are committed to making online shopping easy, 
          enjoyable, and accessible for everyone.
        </p>

        {/* المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Wide Range of Products",
              description: "Discover everything from electronics and fashion to home essentials and more.",
            },
            {
              title: "Fast & Secure Delivery",
              description: "Enjoy quick and reliable delivery, ensuring your order reaches you in perfect condition.",
            },
            {
              title: "24/7 Customer Support",
              description: "Our dedicated support team is available around the clock to assist you with any inquiries.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

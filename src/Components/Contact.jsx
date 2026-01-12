import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      description: e.target.description.value,
    };

    fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({ title: "Message Sent", icon: "success" });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({ title: "Failed to send message", icon: "error" });
      });
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-blue-50 dark:bg-gray-900 transition-colors mt-20">
      <title>AssetVerse | Contact</title>

      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Contact <span className="text-blue-600">AssetVerse</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Have questions about assets, employees, or HR tools? We’re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: <FaPhoneAlt />, title: "Phone", text: "+880 1796173241" },
            { icon: <FaEnvelope />, title: "Email", text: "tahsinsikder456@gmail.com" },
            { icon: <FaMapMarkerAlt />, title: "Address", text: "Rajshahi, Bangladesh" },
            { icon: <FaBuilding />, title: "Office", text: "Corporate Asset Solutions" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-200 dark:border-blue-500 p-6 text-center hover:shadow-xl hover:scale-105 transition"
            >
              <div className="text-3xl text-blue-600 mx-auto mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-300 dark:border-blue-500 p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full p-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full p-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write your message..."
                className="w-full p-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

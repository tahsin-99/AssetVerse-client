import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const EmployeeRegister = () => {
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password, birthDate } = data;
    const imageFile = image[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageURL = res?.data?.data?.display_url;

      await createUser(email, password);
      await updateUserProfile(name, imageURL);

      await axiosSecure.post("/users", {
        name,
        image: imageURL,
        email,
        birthDate,
        role: "Employee",
      });

      navigate(location?.state || "/");
      toast.success("Register Successful");
    } catch (err) {
      console.log(err);
      toast.error("Wrong Information!!");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <>
      <title>AssetVerse | Employee Registration</title>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Register As Employee</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome to AssetVerse
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                {...register("name", {
                  required: "Name is required",
                  maxLength: { value: 20, message: "Name cannot be too long" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  bg-gray-200 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-600 rounded-md cursor-pointer"
                {...register("image")}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="Input Your Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block mb-2 text-sm">Date of Birth</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                {...register("birthDate", { required: "Date is required" })}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 w-full rounded-md py-3 text-white transition-colors duration-300"
              >
                {loading ? (
                  <span className="loading loading-bars loading-xs"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <p className="px-6 text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
            Want to Join As HR?{" "}
            <Link
              to="/hr-register"
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Join As HR
            </Link>
          </p>

          <p className="px-6 text-sm text-center mt-1 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default EmployeeRegister;

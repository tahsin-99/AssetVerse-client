import React from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const EmployeeRegister = () => {
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile,  loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password, joiningDate } = data;

    const imageFile = image[0];
    

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const data = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imageURL = data?.data?.data?.display_url;

      //2. User Registration
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL);
      await axiosSecure.post("/users", {
        name,
        image: imageURL,
        email,
        joiningDate,
        role: "Employee",
      });

      navigate(location?.state || "/");
      toast.success("Register Successful");
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register As Employee</h1>
          <p className="text-sm text-gray-400">Welcome to AssetVerse</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", {
                  required: "Name is required",
                  maxLength: 20,
                  message: "Name cannot be too long",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-lime-100
                 bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                 py-2"
                {...register("image")}
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="Input Your Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              {...register("joiningDate", {
                required: "Date is required",
              })}
              type="date"
              className="input"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#1B3B5F] w-full rounded-md py-3 text-white btn"
            >
              {loading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
       
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-blue-600 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default EmployeeRegister;

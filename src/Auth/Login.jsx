import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn(email, password);
      console.log(res);

      toast.success("Login Successful", { autoClose: 1000 });
      setTimeout(() => {
        navigate(location?.state || "/");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <>
      <title>AssetVerse | Login</title>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Log In</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="Input Your Password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-blue-600"
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 w-full rounded-md py-3 text-white transition-colors duration-300  cursor-pointer"
              >
                {loading ? (
                  <span className="loading loading-bars loading-xs  "></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <p className="px-6 text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              state={location?.state || "/"}
              to="/employee-register"
              className="hover:underline hover:text-blue-500 dark:hover:text-blue-400"
            >
              Join As Employee
            </Link>
            .
          </p>

          <p className="px-6 text-sm text-center mt-1 text-gray-500 dark:text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              state={location?.state || "/"}
              to="/hr-register"
              className="hover:underline hover:text-blue-500 dark:hover:text-blue-400"
            >
              Join As HR
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

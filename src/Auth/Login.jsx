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
      
     const res= await signIn(email, password);
      console.log(res);
      navigate(location?.state || "/");
      toast.success("Login Successful",{
        autoClose:1000,
      });
      
    } catch (err) {
      console.log(err);
      toast.error("Something wrong!!");
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
  };
  
  return (
    <>
    <title>AssetVerse  |Login</title>
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#1B3B5F] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="Input Your Passsword"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#1B3B5F] bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#1B3B5F] btn w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
       
       
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={location?.state || "/"}
            to="/employee-register"
            className="hover:underline hover:text-blue-500 text-gray-600"
          >
            Join As Employee
          </Link>
          .
        </p>
         <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={location?.state || "/"}
            to="/hr-register"
            className="hover:underline hover:text-blue-500 text-gray-600"
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

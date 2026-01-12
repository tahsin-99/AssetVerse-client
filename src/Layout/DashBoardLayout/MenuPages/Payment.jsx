import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const result = await axiosSecure.get("/packages");
      return result.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments-history"],
    queryFn: async () => {
      const result = await axiosSecure.get("/payment-history");
      return result.data;
    },
  });

  const handlePayment = async (pack) => {
    const paymentInfo = {
      packageId: pack._id,
      packageName: pack.name,
      price: pack.price,
      employeeLimit: pack.employeeLimit,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-12 ">
      <title>AssetVerse | Payment</title>

      <h1 className="text-5xl font-bold text-center mb-12">Packages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-2">
        {packages.map((pack) => (
          <div
            key={pack._id}
            className="card w-full shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col justify-between"
          >
            <div className="p-6">
              {pack.name === "Standard" && (
                <span className="badge badge-xs badge-warning mb-2">Most Popular</span>
              )}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{pack.name}</h2>
                <span className="text-xl">${pack.price}/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Can Manage extra {pack.employeeLimit} Employee</span>
                </li>
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handlePayment(pack)}
              className="btn bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white w-full py-3 mt-auto"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold mt-12 mb-6">Payment History</h1>

      <div className="overflow-x-auto border-2 border-blue-800 dark:border-blue-500 rounded">
        <table className="table w-full text-gray-900 dark:text-gray-100">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th></th>
              <th>Transaction ID</th>
              <th>Package Name</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <th>{index + 1}</th>
                <td>{payment.transectionId}</td>
                <td>{payment.packageName}</td>
                <td>${payment.price}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;

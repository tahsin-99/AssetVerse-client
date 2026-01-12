import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';

const AffiliatedEmployees = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: assets = [], refetch, isLoading: assetsLoading } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/affiliated-employee");
      return result.data;
    },
    enabled: !!user,
  });

  const { data: hr, refetch: countEmployee } = useQuery({
    queryKey: ["hr", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/user/hr");
      return result.data;
    },
    enabled: !!user,
  });

  if (assetsLoading) return <Loading />;

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/affiliated-employee/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            countEmployee();
            Swal.fire({
              title: "Removed!",
              text: "Employee has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <title>AssetVerse | Employees</title>
      <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-semibold mb-5">
          Employee Count: {hr?.currentEmployees ?? 0}/{hr?.packageLimit ?? 0}
        </h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra border-2 border-blue-800 dark:border-blue-500 w-full">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Product Name</th>
                <th>Join Date</th>
                <th>Asset Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <th>{index + 1}</th>
                  <td>{asset.employeeName}</td>
                  <td>{asset.employeeEmail}</td>
                  <td>{asset.productName}</td>
                  <td>{new Date(asset.date).toLocaleString()}</td>
                  <td>{asset.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(asset._id)}
                      className="btn bg-red-600 dark:bg-red-500 text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AffiliatedEmployees;

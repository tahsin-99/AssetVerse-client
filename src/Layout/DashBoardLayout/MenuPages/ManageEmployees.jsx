import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from '../../../Components/Loading';

const ManageEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: assets = [], refetch, isLoading: assetsLoading } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/request-asset");
      return result.data;
    },
  });

  const handleUpdate = (id) => {
    const updatedData = {
      status: "approved",
      approvalDate: new Date()
    };
    axiosSecure
      .patch(`/request-asset/${id}`, updatedData)
      .then(() => {
        Swal.fire({
          title: "Approved!",
          text: "Asset approved successfully.",
          icon: "success",
        });
        refetch();
      })
      .catch((err) => {
        const paymentRequired = err.response?.data?.paymentRequired;
        if (paymentRequired) {
          Swal.fire({
            icon: "warning",
            title: "Package Limit Finished!",
            text: "Please upgrade your package to approve more employees.",
            confirmButtonText: "Upgrade Now!!",
          }).then((result) => {
            if (result.isConfirmed) navigate('/dashboard/payment');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response?.data?.message || "Something went wrong",
          });
        }
      });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/request-asset/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (assetsLoading) return <Loading />;

  return (
    <>
      <title>AssetVerse | All Requests</title>
      <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">All Requests:</h1>

        <div className="overflow-x-auto border border-blue-800 dark:border-blue-500 rounded">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Asset</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <th>{index + 1}</th>
                  <td>{asset.employeeName}</td>
                  <td>{asset.employeeEmail}</td>
                  <td>{asset.productName}</td>
                  <td>{asset.quantity}</td>
                  <td>{new Date(asset.requestDate).toLocaleString()}</td>
                  {asset.status === "pending" ? (
                    <td className="text-yellow-400 font-semibold">
                      <span className="badge badge-outline">Pending</span>
                    </td>
                  ) : (
                    <td className="text-green-500 font-semibold">
                      <span className="badge badge-outline">Approved</span>
                    </td>
                  )}
                  <td>
                    {asset.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdate(asset._id)}
                          className="btn bg-green-500 dark:bg-green-600 text-white mr-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(asset._id)}
                          className="btn bg-orange-600 dark:bg-orange-500 text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default ManageEmployees;

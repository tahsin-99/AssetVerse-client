import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ManageEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate=useNavigate()
  

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/request-asset");
      return result.data;
    },
  });

  const handleUpdate = (id) => {
    const updatedData = {
      status: "approved",
    };
    axiosSecure
      .patch(`/request-asset/${id}`, updatedData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Approved!",
          text: "Asset approved successfully.",
          icon: "success",
        });
        refetch();
      })
      .catch((err) => {
        // Check if payment/upgrade is required
        const paymentRequired = err.response?.data?.paymentRequired;

        if (paymentRequired) {
          Swal.fire({
            icon: "warning",
            title: "Package Limit Finished!",
            text: "Please upgrade your package to approve more employees.",
            confirmButtonText: "Upgrade Now!!",
          }).then((result) => {
            if (result.isConfirmed) {
              
              navigate('/dashboard/payment')
            }
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
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>EmployeeName</th>
            <th>EmployeeEmail</th>
            <th>Asset</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset._id}>
              <th>{index + 1}</th>
              <td>{asset.employeeName}</td>
              <td>{asset.employeeEmail}</td>
              <td>{asset.productName}</td>
              <td>{asset.quantity}</td>
              <td>{new Date(asset.date).toLocaleString()}</td>
              {asset.status === "pending" ? (
                <td className="text-yellow-400    items-center font-semibold">
                  <span className="badge badge-outline">Pending</span>
                </td>
              ) : (
                <td className="text-green-600 font-semibold ">
                  <span className="badge  badge-outline">Approved</span>
                </td>
              )}

              <td>
                {asset.status === "pending" ? (
                  <>
                    {" "}
                    <button
                      onClick={() => handleUpdate(asset._id)}
                      className="btn bg-green-500 text-white"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="btn bg-orange-600 text-black"
                    >
                      Reject
                    </button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;

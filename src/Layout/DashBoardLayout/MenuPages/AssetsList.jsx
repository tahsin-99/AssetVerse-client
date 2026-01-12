import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AssetsList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, refetch } = useQuery({
    queryKey: ["assets", user?.email, page],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `assets-list?page=${page}&limit=${limit}`
      );
      return result.data;
    },
  });

  const assets = data.assets || [];
  const totalPages = data.totalPages || 1;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      productName: form.productName.value,
      productType: form.productType.value,
      quantity: form.quantity.value,
      date: form.date.value,
    };

    axiosSecure
      .patch(`/assets-list-update/${selectedAsset._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Asset updated successfully.",
            icon: "success",
          });
          setSelectedAsset(null);
          refetch();
        }
      });
  };

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`assets-list/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <title>AssetVerse | Assets List</title>
      <h1 className="text-4xl font-bold mb-6">Assets List:</h1>

      <div className="overflow-x-auto border-2 border-blue-800 dark:border-blue-500 rounded">
        <table className="table w-full dark:table-auto dark:bg-gray-800 dark:text-gray-100">
          <thead>
            <tr>
              <th></th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Quantity</th>
              <th>Available Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={asset.productImage} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{asset.productQuantity}</td>
                <td>{asset.availableQuantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="btn bg-blue-500 dark:bg-blue-600 dark:text-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleParcelDelete(asset._id)}
                    className="btn bg-orange-600 dark:bg-orange-500 dark:text-gray-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1
                ? "btn-primary dark:bg-blue-700 dark:text-gray-100"
                : "dark:bg-gray-700 dark:text-gray-100"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Update Modal */}
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box dark:bg-gray-800 dark:text-gray-100">
            <h3 className="font-bold text-lg">Update Asset</h3>

            <form className="space-y-3 mt-4" onSubmit={handleUpdate}>
              <input
                name="productName"
                defaultValue={selectedAsset.productName}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="Product Name"
              />

              <input
                name="productType"
                defaultValue={selectedAsset.productType}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="Product Type"
              />

              <input
                name="quantity"
                defaultValue={selectedAsset.quantity}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="Quantity"
              />

              <input
                name="date"
                defaultValue={selectedAsset.date}
                className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="Date Added"
              />

              <button className="btn btn-primary w-full mt-2 dark:bg-blue-600 dark:text-gray-100">
                Update
              </button>
            </form>

            <button
              className="btn btn-error btn-sm mt-3 dark:bg-red-600 dark:text-gray-100"
              onClick={() => setSelectedAsset(null)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssetsList;

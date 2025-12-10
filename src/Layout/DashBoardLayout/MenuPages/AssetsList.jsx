import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AssetsList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("assets-list");
      return result.data;
    },
  });
  
  

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
          console.log(res.data);
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
    <div className="overflow-x-auto border-2 border-blue-800 rounded">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Quantity</th>
            <th>Date Added</th>
            <th>actions</th>
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
                      <img
                        src={asset.productImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <p>{asset.productName}</p>
              </td>
              <td>{asset.productType}</td>
              <td>{asset.productQuantity}</td>
              <td>{asset.dateAdded}</td>
              <td>
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="btn bg-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleParcelDelete(asset._id)}
                  className="btn bg-orange-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Asset</h3>

            <form className="space-y-3 mt-4" onSubmit={handleUpdate}>
              <input
                name="productName"
                defaultValue={selectedAsset.productName}
                className="input input-bordered w-full"
                placeholder="Product Name"
              />

              <input
                name="productType"
                defaultValue={selectedAsset.productType}
                className="input input-bordered w-full"
                placeholder="Product Type"
              />

              <input
                name="quantity"
                defaultValue={selectedAsset.quantity}
                className="input input-bordered w-full"
                placeholder="Quantity"
              />

             

              <input
                name="date"
                defaultValue={selectedAsset.date}
                className="input input-bordered w-full"
                placeholder="Date Added"
              />

              <button className="btn  btn-primary w-full mt-2">Update</button>
            </form>

            <button
              className="btn typ btn-sm btn-error mt-3"
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

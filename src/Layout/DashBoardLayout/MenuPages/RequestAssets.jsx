import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const RequestAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-assets");
      return result.data;
    },
  });

  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const [quantity, setQuantity] = useState(1);

  const openModal = (asset) => {
    setSelectedAsset(asset);
    
    setQuantity(1);
  };
  const submitRequest = async (e) => {
    e.preventDefault();
    if (!selectedAsset) return;

    try {
      const requestData = {
        productId: selectedAsset._id,
        employeeName:user.displayName,
         employeeImage: user.photoURL || user.image || "",
        quantity: Number(quantity),
      };

      await axiosSecure.post("/request-asset", requestData);
      toast.success("Request submitted!");
      setSelectedAsset(null);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit request");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-center justify-center">
      {assets.map((asset) => (
        <div
          key={asset._id}
          className="card bg-base-100 w-96 shadow-sm border-2 border-blue-800"
        >
          <figure>
            <img className="w-300 h-60 " src={asset.productImage} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {asset.productName}
              <div className="badge bg-blue-300">
                {" "}
                Available: {asset.availableQuantity}
              </div>
            </h2>
            <p className="badge badge-outline font-semibold">
              HR Email:{" "}
              <span className="font-bold text-blue-800">{asset.hrEmail}</span>
            </p>
            <div className="card-actions ">
              <div className="badge badge-outline font-semibold">
                CompanyName:{" "}
                <span className="font-bold">{asset.companyName}</span>
              </div>
              <div className="badge badge-outline text-green-600">
                {asset.productType}
              </div>
            </div>
            <button
              onClick={() => openModal(asset)}
              className="btn bg-[#1B3B5F] text-white"
            >
              Request
            </button>
          </div>
        </div>
      ))}
      {/* Modal */}
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request Asset</h3>
            <form className="space-y-3 mt-4" onSubmit={submitRequest}>
              <input
                name="employeeEmail"
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
                placeholder="Employee Email"
              />

              <input
                name="employeeName"
                type="text"
                value={user.displayName}
               
                required
                className="input input-bordered w-full"
                placeholder="Employee Name"
                readOnly
                
              />

              <input
                name="productName"
                type="text"
                value={selectedAsset.productName}
                readOnly
                className="input input-bordered w-full"
                placeholder="Product Name"
              />

              <input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                max={selectedAsset.availableQuantity}
                required
                className="input input-bordered w-full"
                placeholder="Quantity"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedAsset(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAssets;

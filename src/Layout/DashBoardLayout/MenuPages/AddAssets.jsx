import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AddAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const addAsset = async (data) => {
    const { productName, productImage, productType, productQuantity } = data;
    const imageFile = productImage[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageURL = res?.data?.data?.display_url;
      await axiosSecure.post("add-asset", {
        productName,
        productImage: imageURL,
        productType,
        productQuantity: Number(productQuantity),
        availableQuantity: Number(productQuantity),
        dateAdded: new Date(),
        hrEmail: user.email,
      });

      navigate("/dashboard/assets-list");
      toast.success("Asset added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <title>AssetVerse | Add Asset</title>
      <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h2 className="text-3xl sm:text-5xl font-bold mb-8">Add an Asset</h2>
        <form
          onSubmit={handleSubmit(addAsset)}
          className="mt-4 p-6 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 max-w-3xl mx-auto space-y-6"
        >
          {/* Product Name */}
          <fieldset className="space-y-2">
            <label className="label text-xl font-bold">Product Name</label>
            <input
              type="text"
              {...register("productName")}
              className="input w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Product Name"
            />
          </fieldset>

          {/* Product Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-xl font-bold"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("productImage")}
              className="block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 dark:file:bg-blue-700 file:text-blue-700 dark:file:text-blue-50
                hover:file:bg-lime-100 dark:hover:file:bg-lime-600
                bg-gray-100 dark:bg-gray-700 border border-dashed border-blue-300 dark:border-blue-600 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                py-2"
            />
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-300">
              PNG, JPG or JPEG (max 1MB)
            </p>
          </div>

          {/* Product Type */}
          <fieldset className="space-y-2">
            <legend className="fieldset-legend text-xl font-bold">
              Product Type
            </legend>
            <select
              {...register("productType")}
              defaultValue=""
              className="select w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option disabled>Select One</option>
              <option>Returnable</option>
              <option>Non-returnable</option>
            </select>
          </fieldset>

          {/* Product Quantity */}
          <fieldset className="space-y-2">
            <label className="label text-xl font-bold">Product Quantity</label>
            <input
              type="number"
              {...register("productQuantity")}
              className="input w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Product Quantity"
            />
          </fieldset>

          <input
            type="submit"
            className="btn bg-[#3671b5] hover:bg-blue-600 text-white w-full mt-4"
            value="Add Asset"
          />
        </form>
      </div>
    </>
  );
};

export default AddAssets;

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";


const AddAssets = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure() 
    const navigate=useNavigate()
    
  const { register, handleSubmit } = useForm();

  
  

  const addAsset=async(data)=>{
    const {productName,productImage,productType,productQuantity}=data
    const imageFile=productImage[0]

    const formData=new FormData()
    formData.append('image',imageFile)

    

   
    try{
      const data = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );



      const imageURL = data?.data?.data?.display_url;
      await axiosSecure.post('add-asset',{
        productName,
        productImage:imageURL,
        productType,
        productQuantity:Number(productQuantity),
        availableQuantity:Number(productQuantity),
        dateAdded:new Date(),
        hrEmail:user.email,
        
      })
       navigate('/dashboard/assets-list');
            toast.success("Asset added Successful");
            
    }
    catch (err) {
          console.log(err);
          toast.error(err?.message);
        }

  }

  return (
    <>
    <title>AssetVerse |Add Asset</title>
    <div>
      <h2 className="text-3xl sm:text-5xl font-bold">Add an Asset</h2>
      <form onSubmit={handleSubmit(addAsset)} className="mt-12 p-4 text-black
      
      border w-full rounded-2xl mx-auto">
       
        
        <div className=" my-8">
          <fieldset className="fieldset">
            <label className="label text-xl font-bold text-black">Product Name</label>
            <input
              type="text"
              {...register("productName")}
              className="input w-full"
              placeholder="Product Name"
            />
          </fieldset>
          </div>

         <div>
              <label
                htmlFor="image"
                className="block mb-2  text-xl font-bold text-black"
              >
                Product Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-lime-100
             bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
             py-2"
                {...register("productImage")}
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 1MB)
              </p>
            </div>
               <fieldset className="fieldset">
              <legend className="fieldset-legend text-xl font-bold text-black">Product Type</legend>
              <select
                {...register("productType")}
                defaultValue=""
                className="select"
              >
                <option disabled={true}>Select One</option>
                <option >Returnable</option>
                <option >Non-returnable</option>
              </select>
            </fieldset>


      

          <fieldset className="fieldset">
           
         
            <label className="label text-xl font-bold text-black">Product Quantity</label>
            <input
              type="text"
              {...register("productQuantity")}
              
              className="input w-full"
              placeholder="Product Quantity"
            />

               
            
           
          </fieldset>
          
       
        <input
          type="submit"
          className="btn bg-[#3671b5] mt-8 text-white"
          value="Send Parcel"
        />
      </form>
    </div>
    
    </>
  );
};

export default AddAssets;

import Loading from "../../../Components/Loading";
import useAuth from "../../../hooks/useAuth";
import unknownUser from "../../../assets/images/unknownUser.png";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(""); 
  const [image, setImage] = useState(null);

  const {
    data: employee,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lastApprovedCompany", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
  });
  const openModal = () => {
    setName(employee?.name || "");
    setIsOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      let imageURL = employee?.image;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
         imageURL = res?.data?.data?.display_url;
      }
      await axiosSecure.patch("/profile", {
        name,
        image: imageURL,
      });
      refetch();
      setIsOpen(false);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  


// Fetch company affiliations
const { data: companies = [], isLoading: isCompaniesLoading } = useQuery({
  queryKey: ['myCompanies', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get('/my-companies');
    return res.data; 
  },
});

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-5">My Profile</h1>

      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-md text-center w-full max-w-md">
        <img
          src={employee?.image || unknownUser}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-5 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2">
          {employee?.name || "No Name Found"}
        </h2>
        <p className="text-gray-400 mb-6">
          {employee?.email || "No Email Found"}
        </p>
        <p className="mt-2">
  Company affiliations:
  {isCompaniesLoading ? (
    <span> Loading...</span>
  ) : companies.length > 0 ? (
    companies.map((c, index) => (
      <span key={index} className="text-orange-500 font-semibold ml-2">
        {c}{index < companies.length - 1 ? ',' : ''}
      </span>
    ))
  ) : (
    <span className="text-gray-400 ml-2">No affiliations</span>
  )}
</p>


        <button
          onClick={openModal}
          className="btn btn-primary w-full bg-[#BB86FC] text-black hover:bg-[#9B6DFD] mt-4"
        >
          Update Information
        </button>
        <Link to="/" className="btn btn-primary w-full mt-5 ">
          Go Home
        </Link>
      </div>
      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Profile</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-3 mt-4">
              <label className="text-black text-xl font-semibold">Update Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full text-black"
                placeholder="Your Name"
              />
              <label className="text-black text-xl font-semibold"> Upload New Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline bg-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;

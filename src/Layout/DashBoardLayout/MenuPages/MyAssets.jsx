import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
const [searchText,setSearchText]=useState('')
const [debouncedSearch, setDebouncedSearch] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchText);
  }, 800); 

  return () => clearTimeout(timer);
}, [searchText]);


  const { data: myAssets = [], isLoading } = useQuery({
    queryKey: ["my-assets",debouncedSearch,assetTypeFilter],
    enabled: !!user?.email,
    queryFn: async () => {
      let url = `/my-assets?searchText=${debouncedSearch}`;
      if(assetTypeFilter){
        url +=`&assetType=${assetTypeFilter}`
      }
      const res =await axiosSecure.get(url)
      return res.data;
    },
  });
  
  const handleDownLoad=()=>{
    const doc=new jsPDF()


     const columns = [
    "Asset Name",
    "Asset Type",
    "Company",
    "Request Date",
    "Approval Date",
    "Status",
  ];
  const rows=myAssets.map((asset)=>{

 
  let approvalDateStr = "—";
  if(asset.approvalDate){
    approvalDateStr=new Date(assetTypeFilter.approvalDate).toLocaleString()
  }
  return [
    asset.productName,
    asset.productType,
    asset.companyName,
    new Date(asset.requestDate).toLocaleString(),
    approvalDateStr,
    asset.status,
  ]
   })
   autoTable(doc,{
    startY: 25,
    head: [columns],
    body: rows,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save("my-assets.pdf");
  }
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div >
      <title>AssetVerse |My Assets</title>
      <h1 className="text-4xl font-bold">My Assets:</h1>
      

    <div className="flex justify-between items-center">
         <div>
         <label className="input my-5" >

        <svg
          className="h-[1em] opacity-50 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input  onChange={(e)=>setSearchText(e.target.value)} type="search" value={searchText} required placeholder="Search Asset" />
      </label>
     </div>

       <div>
        <select
        value={assetTypeFilter}
        onChange={(e) => setAssetTypeFilter(e.target.value)}
        className="select select-bordered my-2"
      >
        <option value="">All Types</option>
        <option value="Returnable">Returnable</option>
        <option value="Non-returnable">Non-returnable</option>
      </select>
       </div>
    </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Asset Image</th>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Company Name</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Approval Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myAssets.map((asset, index) => (
            <tr key={asset._id}>
              <th>{index + 1}</th>
              <td>
                <img
                  className="w-15 rounded-full"
                  src={asset.productImage}
                  alt=""
                />
              </td>
              <td>{asset.productName}</td>
              <td>{asset.productType}</td>
              <td>{asset.companyName}</td>
              <td>{new Date(asset.requestDate).toLocaleString()}</td>
              <td>{asset.status}</td>
              <td>{new Date(asset.approvalDate).toLocaleString()}</td>
              <td>
                {asset.status === "approved" &&
                  asset.productType === "Returnable" && (
                    <>
                      <button className="btn bg-blue-800 text-white">
                        Return
                      </button>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownLoad} className="btn bg-green-700 text-white">Download PDF</button>
    </div>
  );
};

export default MyAssets;


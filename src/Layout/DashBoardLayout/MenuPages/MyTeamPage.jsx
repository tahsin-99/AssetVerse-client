import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const MyTeamPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");

  // Fetch all companies first
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get("/my-companies")
      .then(res => {
        setCompanies(res.data);
        setCompanyFilter(res.data[0] || ""); 
      })
      .catch(err => console.log(err));
  }, [user]);

  // Fetch colleagues based on selected company
  const { data: colleagues = [], isLoading } = useQuery({
    queryKey: ["my-team", companyFilter],
    enabled: !!user?.email && !!companyFilter,
    queryFn: async () => {
      let url = "/my-team";
      if (companyFilter) url += `?company=${companyFilter}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">My Team</h1>

      {/* Company filter dropdown */}
      {companies.length > 1 && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Company:</label>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="select select-bordered"
          >
            {companies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {colleagues.map((col) => (
          <div key={col.employeeEmail} className="card p-4 shadow rounded border bg-blue-100 border-blue-600">
            <img
              className="w-20 h-20 rounded-full mb-2"
              src={col.employeeImage}
              alt=''
            />
            <h3 className="font-bold text-lg">{col.employeeName}</h3>
            <p className="text-sm">{col.employeeEmail}</p>
            <p className="text-sm">{col.position || "Employee"}</p>
            <p className="text-sm">{col.companyName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamPage;

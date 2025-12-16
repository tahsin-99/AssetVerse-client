import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const MyTeamPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");

  
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/my-companies")
      .then((res) => {
        setCompanies(res.data);
        setCompanyFilter(res.data[0] || "");
      })
      .catch((err) => console.log(err));
  }, [user]);

  
    const { data: team = [], isLoading } = useQuery({
    queryKey: ["team", company],
    enabled: !!company,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-team?company=${company}`);
      return res.data;
    },
  });

   const { data: birthdays = [] } = useQuery({
    queryKey: ["birthdays", company],
    enabled: !!company,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-team/birthdays?company=${company}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (

     <div className="p-6">
      <title>AssetVerse |My Team</title>
      <h1 className="text-4xl font-bold mb-6">My Team</h1>

      
      {companies.length > 1 && (
        <select
          className="select select-bordered mb-6"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          {companies.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      )}

     
      <div className="grid md:grid-cols-3 gap-4">
        {team.map(member => (
          <div
            key={member.employeeEmail}
            className="card p-4 shadow border bg-green-200"
          >
            <img
              src={member.employeeImage}
              className="w-20 h-20 rounded-full mb-2"
              alt=""
            />
            <h3 className="font-bold">{member.employeeName}</h3>
            <p>{member.employeeEmail}</p>
            <p className="text-sm">{member.position}</p>
          </div>
        ))}
      </div>

      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          🎉 Upcoming Birthdays (This Month)
        </h2>

        {birthdays.length === 0 && (
          <p className="text-gray-500">No birthdays this month</p>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {birthdays.map(b => (
            <div
              key={b.employeeEmail}
              className="p-4 border rounded bg-blue-100"
            >
              <h4 className="font-bold">{b.employeeName}</h4>
              <p>
                🎂{" "}
                {new Date(b.birthDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTeamPage;

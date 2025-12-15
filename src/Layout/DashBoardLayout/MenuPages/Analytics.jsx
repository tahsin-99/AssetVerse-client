import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../../../Components/Loading";

const COLORS = ["#2563eb", "#16a34a"];
const BAR_COLORS = ["#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#14b8a6"];

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: types = [], isLoading: a1 } = useQuery({
    queryKey: ["assetTypes"],
    queryFn: async () => (await axiosSecure.get("/analytics/asset-types")).data,
  });

  const { data: topAssets = [], isLoading: a2 } = useQuery({
    queryKey: ["top-requested-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested-assets");
      return res.data.map((item) => ({
        name: item._id,
        total: item.totalRequests,
      }));
    },
  });

  if (a1 || a2) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-4">Returnable vs Non-returnable</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={types}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {types.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-4">Top Requested Assets</h2>

        <ResponsiveContainer width="30%" height={300}>
          <BarChart data={topAssets}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip  cursor={false}/>
            <Bar dataKey="total" >
              {topAssets.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

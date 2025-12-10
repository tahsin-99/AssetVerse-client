import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AffiliatedEmployees = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const { data: assets = [] } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/request-asset");
      return result.data;
    },

  });
  console.log(assets);
    return (
        <div className="overflow-x-auto">
  <table className="table table-zebra">
   
    <thead>
      <tr>
        <th></th>
        <th>Employee Name</th>
        <th>Employee Email</th>
        <th>Product Name</th>
        <th>Join Date</th>
        <th>Asset Count</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
        assets.map((asset,index)=><tr key={asset._id}>
        <th>{index+1}</th>
        <td>{asset.employeeName}</td>
        <td>{asset.employeeEmail}</td>
        <td>{asset.productName}</td>
        <td>{asset.date}</td>
        <td>Asset Count</td>
        <td>Action</td>
      </tr>)
    }
      
      
      
    </tbody>
  </table>
</div>
    );
};

export default AffiliatedEmployees;
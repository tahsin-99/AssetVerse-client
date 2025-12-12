import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AffiliatedEmployees = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const { data: assets = [] ,refetch} = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/request-asset");
      return result.data;
    },

  });
  console.log(assets);

  const handleRemove=(id)=>{
    Swal.fire({
          title: "Are you sure?",
          text: "You want to remove this employee?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,  Remove !",
        })
        .then((result)=>{
          if(result.isConfirmed){
            axiosSecure.delete(`/request-asset/${id}`)
            .then((res)=>{
              if (res.data.deletedCount) {
                          refetch();
                          Swal.fire({
                            title: "Removed!",
                            text: "Employee has been removed.",
                            icon: "success",
                          });
                        }
            })
          }
        })
  }
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
        <td>{new Date(asset.date).toLocaleString()}</td>
        <td>{asset.quantity}</td>
        <td onClick={()=>handleRemove(asset._id)} className='btn bg-red-600 text-white'>Remove</td>
      </tr>)
    }
      
      
      
    </tbody>
  </table>
</div>
    );
};

export default AffiliatedEmployees;
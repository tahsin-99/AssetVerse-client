import React from 'react';
import useRole from '../../hooks/useRole';
import { Navigate } from 'react-router';
import Loading from '../../Components/Loading';


const DashBoardHome = () => {
     const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />;

  if (role === "HR") {
    return <Navigate to="/dashboard/assets-list" replace='true' />;
  }

  if (role === "Employee") {
    return <Navigate to="/dashboard/request-assets" replace ='true' />;
  }

  return <Navigate to="/login" replace />;
};

export default DashBoardHome;
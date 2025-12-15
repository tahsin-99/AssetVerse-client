import React, { Children } from 'react';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router';

const HrRoute = ({children}) => {
    const [role,isRoleLoading]=useRole()
    
       if(isRoleLoading)return<Loading></Loading>
       if(role==='HR') return children
       return <Navigate to='/' replace='true'></Navigate>
    
};

export default HrRoute;
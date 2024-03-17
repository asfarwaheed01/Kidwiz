import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { Navigate } from "react-router-dom";
import { ROUTES } from '../../../config/routes';

 const AdminProtectedRoutes = ({children}) => {

    const { user } = useAppContext();


    if (user.role.toLowerCase() === 'parent') {
        return <Navigate to={ROUTES.PARENT.DASHBOARD.INDEX} />
    }
    if (user.role.toLowerCase() === 'child') {
        return <Navigate to={ROUTES.CHILD.DASHBOARD.INDEX} />
    }

    if (user.role.toLowerCase() === 'admin') {
        return children;
        
    }

  return (
    <div>Role Error</div>
  )
}

export default AdminProtectedRoutes;

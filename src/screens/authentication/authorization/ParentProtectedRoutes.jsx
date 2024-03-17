import React, { useEffect, useState} from 'react'
import { useAppContext } from '../../../context/appContext'
import { Navigate } from "react-router-dom";
import { ROUTES } from '../../../config/routes';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen } from '../../common';


const ParentProtectedRoutes = ({children}) => {

    const {navigate} = useNavigate();

    const { user, users_children, getAllChilds, childrenLoading } = useAppContext();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(()=>{
      if (user.no_of_chlid > 0 && !users_children[0].id) {
        getAllChilds();
      }
      if (users_children[0].id) {
        setShowLoading(false);
      }
      console.log("Here");
    },[childrenLoading]);


    if (user.role.toLowerCase() === 'admin') {
        return <Navigate to={ROUTES.ADMIN.DASHBOARD.INDEX} />
    }
    if (user.role.toLowerCase() === 'child') {
        return <Navigate to={ROUTES.CHILD.DASHBOARD.INDEX} />
    }

    if (showLoading) {
      return <LoadingScreen message = "Loading your children's data" />;
    }
    if (user.role.toLowerCase() === 'parent') {
        return children;
    }

  return (
    <div>Role Error</div>
  )
}

export default ParentProtectedRoutes
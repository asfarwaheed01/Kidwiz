import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

import { LoadingScreen } from "../../common/index";

const ProtectedRoutes = ({children}) => {
    const [showLoading, setShowLoading] = useState(true);
    const {  user, isLoading, getAllChilds } = useAppContext();

    useEffect(()=>{
        // if (isLoading === false && showAlert === false && user !== null) {
        if (user) {
            setShowLoading(false);
            console.log("This function is called");
            getAllChilds();
        }    
            // getAllChilds();
        // }

        // if (user) {
        //     getAllChilds();
        // }

        // if (!user) {
        //     checkUserLogedIn();
        // }

        // if (user && ) {
            
        // }

    },[isLoading, user]);

    if(showLoading){

        return <LoadingScreen message="Your profile is loading"/>
    }

    // console.log("Check Before " + user);
    if (!user) {
        // console.log("Check AFter " + user);
        return <Navigate to={ROUTES.AUTHENTICATION.LOGIN} />
    }

    

    return children
}

export default ProtectedRoutes;
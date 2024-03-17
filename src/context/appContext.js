import React, { useReducer, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import reducer from './reducer';
import axios from 'axios';

import { API_BASE_URL, 
  SIGN_UP_END_POINT, 
  LOGIN_END_POINT, 
  ADD_CHILD,
  UPDATE_CHILD,
  GET_ALL_CHILDERN, 
  DELETE_CHILDREN,

} 
  from '../config/backend_endpoints';

import { ROUTES } from '../config/routes';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_PROFILEDATA,
  LOAD_DATA_FROM_LOCAL_START,
  LOAD_DATA_FROM_LOCAL_COMPLETE,
  LOGOUT_USER,
  ADD_NEW_CHILD_START,
  ADD_NEW_CHILD_SUCCESS,
  ADD_NEW_CHILD_ERROR,
  UPDATE_CHILD_START,
  UPDATE_CHILD_SUCCESS,
  UPDATE_CHILD_ERROR,
  CHILDREN_LOADING_START,
  CHILDREN_LOADING_SUCCESS,
  CHILDREN_LOADING_ERROR,
  CHILDREN_DELETE_START,
  CHILDREN_DELETE_SUCCESS,
  CHILDREN_DELETE_ERROR,

  CHILD_SELECT_CHANGE,
  
} from './actions';

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  users_children: [{},{},{}],
  selected_Child_index: 0,
  childrenLoading: false,
  token: '',
  
};



const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: API_BASE_URL,
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status) {
        if (error.response.status === 401) {
          logoutUser();
        }
      }
      
      return Promise.reject(error);
    }
  );

  // Below Axios is for whole Application
  const authorizedAxios = axios.create({
    baseURL: '',
    // timeout: 3000,
    headers: {
      "Authorization" : `Bearer ${state.token}`,
      'Content-Type': 'multipart/form-data'
  }
  });

  // Add a response interceptor
  authorizedAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response['status'] !== undefined) {
      if (error.response.status === 401) {
        logoutUser();
      }
    }
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  // Add request interceptor
  // authorizedAxios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

  

  
  const setupUser = async ({ currentUser }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        SIGN_UP_END_POINT,
        {fullname: currentUser.fullname, email: currentUser.email, password:currentUser.password, "user_role":"parent"}
      );
      // console.log("This is test " + JSON.stringify(data));

      let user = data.user[0];
      user = { ...user , "role": data.role, "no_of_chlid":data.no_of_chlid, "onboard": data.onboard, "tier": data.tier, "trail":data.trail };
      const token = data.access;

      // console.log(user);
      
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token },
      });
      storeInLocalStorage("user", JSON.stringify(user))
      storeInLocalStorage("token", token)
    } catch (error) {
      // console.log(error.response.data);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.user },
      });
    }
    // clearAlert();
  };

  


  const loginUser = async ({ currentUser }) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        LOGIN_END_POINT,
        { username: currentUser.email, password:currentUser.password}
      );
      // console.log("This is test " + JSON.stringify(data));

      let user = data.user;
      user = { ...user , "role": data.role, "no_of_chlid":data.no_of_chlid, "onboard": data.onboard, "tier": data.tier, "trail":data.trail, "img":data.img, "mobile_number":data.mobile_number };
      const token = data.access;
      
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      storeInLocalStorage("user", JSON.stringify(user));
      storeInLocalStorage("token", token);

    } catch (error) {
      console.log(error);
      let error_message = "";
      if (error.response) {
        error_message = error.response.data.user === "null" ? 'Wrong Email or Password' : 'Server Error';
      }else{
        error_message = error.message;
      }
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error_message },
      });
    }
    // clearAlert();
  };

  const updateUserProfileData = async (data) => {
    console.log(data);
    let user = data.user_data;
    user = { ...user , "role": data.role, "no_of_chlid":data.no_of_chlid, "onboard": data.onboard, "tier": data.tier, "trail":data.trail, "img":data.img, "mobile_number":data.mobile_number };
    // const token = data.access;
    storeInLocalStorage("user", JSON.stringify(user));
    // storeInLocalStorage("token", token);
    dispatch({
      type: UPDATE_USER_PROFILEDATA,
      payload: { user },
    });
  }

  const storeInLocalStorage = (key,value)=>{
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  const checkUserLogedIn = async () => {

    console.log("Loading user from local...!");
    dispatch({type:LOAD_DATA_FROM_LOCAL_START})
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    // console.log(loggedInUser);
    // if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch({type: LOAD_DATA_FROM_LOCAL_COMPLETE,
      payload: {user: foundUser, token:token}})
      // loginUser({currentUser:foundUser});
      console.log("User from LocalDB => " + foundUser);
      
    // }
  }
  
  const logoutUser = async () => {
    // await authFetch.get('/auth/logout');
    storeInLocalStorage("user", null)
    storeInLocalStorage("token", '')
    dispatch({ type: LOGOUT_USER });
    navigate(ROUTES.AUTHENTICATION.LOGIN);
  };
 
  // const getCurrentUser = async () => {
  //   dispatch({ type: GET_CURRENT_USER_BEGIN });
  //   try {
  //     const { data } = await authFetch('/auth/getCurrentUser');
  //     const { user, location } = data;

  //     dispatch({
  //       type: GET_CURRENT_USER_SUCCESS,
  //       payload: { user, location },
  //     });
  //   } catch (error) {
  //     if (error.response.status === 401) return;
  //     logoutUser();
  //   }
  // };
  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  const createNewChild = async (child, childImg)=>{
    // console.log(child.fullname + " " + child.age + " " + child.gender + " " + child.img);
    dispatch({type:ADD_NEW_CHILD_START});

    console.log(child);
    
    await axios.post(ADD_CHILD, {
        ...child,
        "img": childImg
      },{
        headers: {
            "Authorization" : `Bearer ${state.token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
      .then((response) => {
        console.log(response);
        dispatch({type:ADD_NEW_CHILD_SUCCESS, 
          payload:{child:response.data}});

          // storeInLocalStorage("children", state.children)

      }, (error) => {
        console.log(error);
        dispatch({type:ADD_NEW_CHILD_ERROR, 
          payload:{error}});
      });
}

const updateChild = async (child, childImg)=>{
  // console.log(child.fullname + " " + child.age + " " + child.gender + " " + child.img);
  dispatch({type:UPDATE_CHILD_START});

  console.log(child);

  let dataForPatch = {...child};
  if (childImg) {
    dataForPatch.img = childImg;
  }
  
  
  await axios.patch(UPDATE_CHILD, {
      ...dataForPatch
    },{
      headers: {
          "Authorization" : `Bearer ${state.token}`,
          'Content-Type': 'multipart/form-data'
      }
  })
    .then((response) => {
      console.log(response);
      dispatch({type:UPDATE_CHILD_SUCCESS});

        // storeInLocalStorage("children", state.children)

    }, (error) => {
      console.log(error);
      dispatch({type:UPDATE_CHILD_ERROR, 
        payload:{error}});
    });
}



const getAllChilds = async () => {

  // console.log(" Token " + state.token);
  dispatch({type:CHILDREN_LOADING_START})

  await axios.get(GET_ALL_CHILDERN, {
  headers: {
    "Authorization" : `Bearer ${state.token}`,
    'Content-Type': 'text/plain'
  }
})
.then((response) => {
  console.log(response.data)
  dispatch({type:CHILDREN_LOADING_SUCCESS, payload:{users_children:response.data}})
  // for (let index = 0; index < response.data.length && index < state.children.length; index++) {
  //     state.children[index] = response.data[index];
  // }

})
.catch((error) => {
  // console.log(error);
  dispatch({type:CHILDREN_LOADING_ERROR, payload:{error}})
  console.error(error)
  if (error.response.status === 401) {
    logoutUser();
  }
})

}


const changeSelectedChild = async (selectedIndex) => {
  dispatch({type:CHILD_SELECT_CHANGE, 
    payload:{"selectedIndex":selectedIndex}});
}



const deleteChild = async (child_id) => {
  dispatch({type:CHILDREN_DELETE_START});
    
  await axios.post(DELETE_CHILDREN, {
      'id':child_id
    },{
      headers: {
          "Authorization" : `Bearer ${state.token}`,
          'Content-Type': 'multipart/form-data'
      }
  })
    .then((response) => {
      console.log(response);
      dispatch({type:CHILDREN_DELETE_SUCCESS, 
        payload:{child:response.data}});

        // storeInLocalStorage("children", state.children)

    }, (error) => {
      console.log(error);
      dispatch({type:CHILDREN_DELETE_ERROR, 
        payload:{error}});
    });
}



  useEffect(() => {
    // console.log("Just Entered in ");
    checkUserLogedIn();
  }, []);

  // useEffect(() => {
  //   if (state.token != '') {
  //     getAllChilds();  
  //   }
  // },[state.token]);

  

  return (
    <AppContext.Provider
      value={{
        ...state,
        authorizedAxios,
        setupUser,
        loginUser,
        updateUserProfileData,
        checkUserLogedIn,
        logoutUser,
        createNewChild,
        updateChild,
        getAllChilds,
        changeSelectedChild,
        deleteChild,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

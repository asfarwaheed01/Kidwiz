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

import { initialState } from './appContext';

const reducer = (state, action) => {
  // if (action.type === DISPLAY_ALERT) {
  //   return {
  //     ...state,
  //     showAlert: true,
  //     alertType: 'danger',
  //     alertText: 'Please provide all values!',
  //   };
  // }
  // if (action.type === CLEAR_ALERT) {
  //   return {
  //     ...state,
  //     showAlert: false,
  //     alertType: '',
  //     alertText: '',
  //   };
  // }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, 
      isLoading: true, 
      showAlert: false,
      alertText: "", };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertText: "",
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, 
      isLoading: true,
      showAlert: false,
      alertText: "",
     };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertText: "",
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === UPDATE_USER_PROFILEDATA) {
    return {
      ...state,
      // isLoading: false,
      // showAlert: false,
      // alertText: "",
      user: action.payload.user,
      // token: action.payload.token,
    };
  }
  if (action.type === LOAD_DATA_FROM_LOCAL_START){
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === LOAD_DATA_FROM_LOCAL_COMPLETE) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      userLoading: true,
      isLoading: false,
      showAlert: false,
      alertText: '',
      alertType: '',
      user: null,
      children: [{},{},{}],
      token: '',
    }
  }
  if (action.type === ADD_NEW_CHILD_START){
    return {
      ...state,
      isLoading:true,
    }
  }
  if (action.type === ADD_NEW_CHILD_SUCCESS) {
    
    // state.children.push(action.payload.child)
    // for (let index = 0; index < state.children.length; index++) {
    //   if(Object.keys(state.children[index]).length === 0 && state.children[index].constructor === Object){
    //     state.children[index] = action.payload.child;
    //     break;
    //   }
    // }
    return {
      ...state,
      isLoading: false,
      }
    }
  if (action.type === ADD_NEW_CHILD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === UPDATE_CHILD_START){
    return {
      ...state,
      isLoading:true,
    }
  }
  if (action.type === UPDATE_CHILD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      }
    }
  if (action.type === UPDATE_CHILD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }    
  if (action.type === CHILDREN_LOADING_START) {
    return {
      ...state,
      childrenLoading: true,
    }
  }
  if (action.type === CHILDREN_LOADING_SUCCESS) {

    state.users_children =  [{},{},{}];
    for (let index = 0; index < state.users_children.length && index < action.payload.users_children.length; index++) {
        state.users_children[index] = {...action.payload.users_children[index], childfocus: JSON.parse(action.payload.users_children[index].childfocus)};
        // console.log(JSON.parse(action.payload.children[index].childfocus));
    }

    return {
      ...state,
      childrenLoading: false
    }
  }
  if (action.type === CHILDREN_LOADING_ERROR) {
    return {
      ...state,
      childrenLoading: false
    }
  }

  if (action.type === CHILD_SELECT_CHANGE) {
    return {
      ...state,
      selected_Child_index: action.payload.selectedIndex,
    }
  }

  if (action.type === CHILDREN_DELETE_START) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === CHILDREN_DELETE_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === CHILDREN_DELETE_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  // if (action.type === TOGGLE_SIDEBAR) {
  //   return {
  //     ...state,
  //     showSidebar: !state.showSidebar,
  //   };
  // }
  // if (action.type === LOGOUT_USER) {
  //   return {
  //     ...initialState,
  //     userLoading: false,
  //   };
  // }
  // if (action.type === UPDATE_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === UPDATE_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     user: action.payload.user,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: 'success',
  //     alertText: 'User Profile Updated!',
  //   };
  // }
  // if (action.type === UPDATE_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: 'danger',
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === HANDLE_CHANGE) {
  //   return {
  //     ...state,
  //     page: 1,
  //     [action.payload.name]: action.payload.value,
  //   };
  // }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;

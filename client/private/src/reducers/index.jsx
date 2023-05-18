import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

const authInitials = {
  isLogin: Cookies.get('token') ? Cookies.get('token') : null,
  setLoading: null,
  grantedPermissions: [],
  role: '',
  usermail: '',
  userdata: [],
  basicData: [],
  medicalData: [],
};
const authReducer = (state = authInitials, action) => {
  switch (action.type) {
    case 'GET_LOGIN':
      return {
        ...state,
        isLogin: Cookies.get('token'),
        role: action.payload,
        grantedPermissions: action.permission,
      };

    case 'LOGOUT':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        setLoading: action.payload,
      };
    case 'SET_USERMAIL':
      return {
        ...state,
        usermail: action.payload,
      };
    case 'SET_USERDATA':
      return {
        ...state,
        userdata: action.payload,
      };
    case 'SET_BASICDATA':
      return {
        ...state,
        basicData: action.payload,
      };
    case 'SET_MEDICALDATA':
      return {
        ...state,
        medicalData: action.payload,
      };

    default:
      return state;
  }
};

// msg reducer
const msgInitials = {
  successMsg: '',
  errorMsg: '',
  feedbacks: [],
  feedback: '',
};

const msgReducer = (state = msgInitials, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMsg: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMsg: action.payload,
      };
    case 'SET_USER_FEEDBACKS':
      return {
        ...state,
        feedbacks: action.payload,
      };
    case 'SET_USER_FEEDBACK':
      return {
        ...state,
        feedback: action.payload,
      };

    default:
      return state;
  }
};

//permission reducer
const permissionInitials = {
  permissions: [],
  roleData: [],
  currentUserPermissions: [],
};
const permissionReducer = (state = permissionInitials, action) => {
  switch (action.type) {
    case 'GET_PERMISSION':
      return {
        ...state,
        permissions: action.payload,
      };

    case 'SET_CURRENT_DATA':
      return {
        ...state,
        currentUserPermissions: action.payload,
      };
    case 'SET_ROLE_DATA':
      return {
        ...state,
        roleData: action.payload,
      };
    case 'SET_GRANTED':
      return {
        ...state,
        grantedPermissions: action.payload,
      };

    default:
      return state;
  }
};

// hospital reducer
const hospitalInitials = {
  hospital_details: [],
  doctor_details: [],
  department_details: [],
  Diseases: [],
  report: [],
};

const hospitalReducer = (state = hospitalInitials, action) => {
  switch (action.type) {
    case 'SET_HOSPITALS':
      return {
        ...state,
        hospital_details: action.payload,
      };
    case 'SET_DOCTORS':
      return {
        ...state,
        doctor_details: action.payload,
      };
    case 'SET_DEPARTMENTS':
      return {
        ...state,
        department_details: action.payload,
      };
    case 'SET_DISEASES':
      return {
        ...state,
        Diseases: action.payload,
      };
    case 'SET_DISEASES_REPORT':
      return {
        ...state,
        report: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  msg: msgReducer,
  hospital: hospitalReducer,
  permissions: permissionReducer,
});

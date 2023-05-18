import Cookies from 'js-cookie';
import { deleteData, getData, postData, updateData } from '../services';

// for toasters

// toaster for success message
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: null,
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: null,
  });
};

// action for logout
export const setLogout = (navigate) => async (dispatch) => {
  localStorage.removeItem('currentUser');
  Cookies.remove('token');
  dispatch(setSuccessMessage('Logout successfully'));
  navigate();
  // await service.userLogout();
};

//change-password
export const changePass = (props) => async (dispatch) => {
  const { data } = await postData('/profile/change-password', props);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to fetch feedbacks
export const fetchFeedbacks = (id) => async (dispatch) => {
  const { data } = await getData('/contact/feedback');
  if (data.success) {
    dispatch({
      type: 'SET_USER_FEEDBACKS',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to fetch feedbacks
export const readMessage = (id) => async (dispatch) => {
  const { data } = await getData(`/contact/feedback/${id}`);
  console.log('data', data);
  if (data.success) {
    dispatch({
      type: 'SET_USER_FEEDBACK',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//get user profile
export const getUserProfile = () => async (dispatch) => {
  const { data } = await getData('profile/data');
  if (data.success) {
    dispatch({
      type: 'SET_USERDATA',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//get basic data
export const getBasicProfile = () => async (dispatch) => {
  const { data } = await getData('profile/basic-data');
  if (data.success) {
    dispatch({
      type: 'SET_BASICDATA',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//update basic profile

export const UpdateBasicProfile = (props) => async (dispatch) => {
  const { data } = await updateData('profile/basic-data', props);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
    dispatch(getUserProfile());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};


//get medical data
export const getMedicalProfile = () => async (dispatch) => {
  const { data } = await getData('profile/med-data');
  if (data.success) {
    dispatch({
      type: 'SET_MEDICALDATA',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};


//update medical info

export const UpdateMedInfo = (props,navigate) => async (dispatch) => {
  const { data } = await updateData('profile/med-data', props);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
    navigate()
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
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
import Cookies from 'js-cookie';
import { setData, getData, updateData, deleteData } from '../services';


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

//for post contact form details
export const contactDetails = (input) => async (dispatch) => {
  let { data } = await setData('/contact', input);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
  }
};


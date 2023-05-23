import Cookies from 'js-cookie';
import { postData, getData } from '../../../services';
import {
  setSuccessMessage,
  setErrorMessage,
  loaderTrue,
  loaderFalse,
} from '../../../actions';

//to report disease
export const reportDisease = (props, navigate) => async (dispatch) => {
  console.log(props);
  const { data } = await postData('/profile/report-disease', props);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

// get all diseases
export const getDiseases = () => async (dispatch) => {
  dispatch(loaderTrue());
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { data } = await getData('/disease');
  if (data.success) {
    dispatch({
      type: 'SET_DISEASES',
      payload: data.data,
    });
    dispatch(loaderFalse());
  }
};

//get disease report of patient
export const getListOfDiseases = () => async (dispatch) => {
  const { data } = await getData('/disease/get-report');
  if (data.success) {
    dispatch({
      type: 'SET_DISEASES_REPORT',
      payload: data.data,
    });
  }
};

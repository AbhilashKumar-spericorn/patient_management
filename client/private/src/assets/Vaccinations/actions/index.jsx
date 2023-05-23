import { getData, postData } from '../../../services';

import {
  setSuccessMessage,
  setErrorMessage,
  loaderTrue,
  loaderFalse,
} from '../../../actions';

// get all vaccines
export const getVaccines = () => async (dispatch) => {
  const { data } = await getData('/vaccines');
  if (data.success) {
    dispatch({
      type: 'SET_VACCINES',
      payload: data.data,
    });
  }
};

// add vaccinations
export const registerVaccinations = (props, navigate) => async (dispatch) => {
  const { data } = await postData('/vaccines', props);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
    dispatch(loaderFalse());

    navigate();
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

// get registered vaccine details
export const getVaccinationData = () => async (dispatch) => {
  const { data } = await getData('/vaccines/get-data');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch({
      type: 'SET_VACCINATION_DATA',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

// get  vaccine details
export const getAllVaccinations = () => async (dispatch) => {
  const { data } = await getData('/vaccines/list');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch({
      type: 'VACCINATIONS_DATA',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to issue vaccine certificate
export const issueVaccineCertificate = () => async (dispatch) => {
  const { data } = await postData('/vaccines/issue-certificate');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

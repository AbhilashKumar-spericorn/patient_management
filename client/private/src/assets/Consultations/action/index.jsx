import { getData, updateData, postData, deleteData } from '../../../services';
import {
  setSuccessMessage,
  setErrorMessage,
  loaderTrue,
  loaderFalse,
} from '../../../actions';

//to fetch hospitals

export const fetchHospitals = (id) => async (dispatch) => {
  const { data } = await getData('/hospital');
  if (data.success) {
    dispatch({
      type: 'SET_HOSPITALS',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to fetch departments
export const fetchDepartments = (id) => async (dispatch) => {
  const { data } = await getData('/department');
  if (data.success) {
    dispatch({
      type: 'SET_DEPARTMENTS',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to fetch doctors
export const fetchDoctors = (id) => async (dispatch) => {
  const { data } = await getData('/doctor');
  if (data.success) {
    dispatch({
      type: 'SET_DOCTORS',
      payload: data.data,
    });
    // dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//add  consultations

export const registerConsultant = (props, navigate) => async (dispatch) => {
  console.log('props', props);
  dispatch(loaderTrue());
  const { data } = await postData('/consultation', props);
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch(loaderFalse());

    dispatch(getConsultationData());
    navigate();
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

// get registered user consultation
export const getConsultationData = () => async (dispatch) => {
  const { data } = await getData('/consultation/user-data');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch({
      type: 'SET_CONSULTATION_DATA',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

// get  vaccine details
export const getAllConsultations = () => async (dispatch) => {
  const { data } = await getData('/consultation/list');
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    dispatch({
      type: 'CONSULTATION_DATA',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//to issue consultation certificate
export const issueConsultationCertificate = (id) => async (dispatch) => {
  const { data } = await postData(`/consultation/issue-certificate/${id}`);
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    // console.log('data.data', data.data);
    const reducedObject = data.data.reduce((result, obj) => {
      return { ...result, ...obj };
    }, {});

    // console.log(reducedObject);
    dispatch({
      type: 'CONSULTATION_CERTIFICATE',
      payload: reducedObject,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

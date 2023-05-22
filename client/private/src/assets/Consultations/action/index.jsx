import { getData, updateData, postData, deleteData } from '../../../services';
import { setSuccessMessage, setErrorMessage } from '../../../actions';

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

export const registerConsultant = (props) => async (dispatch) => {
  console.log('props', props)
  const { data } = await postData('/consultation', props);
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
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
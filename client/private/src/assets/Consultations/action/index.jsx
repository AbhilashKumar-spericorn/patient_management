import { getData, updateData, postData, deleteData } from '../../../services';
import {
  setSuccessMessage,
  setErrorMessage,
  loaderTrue,
  loaderFalse,
} from '../../../actions';
import Web3 from 'web3';
import ConsultationCertificate from '../../../blockchain/ConsultationCertificate';
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
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);

    const certificationValues = {
      patientName: reducedObject?.login_details?.name,
      patientUUID: JSON.stringify(
        reducedObject?.login_details?.aadharNo
      ),
      patientRegId: reducedObject?.loginId,
      doctorName: reducedObject?.doctor_details?.doctorName,
      consultationTime: reducedObject?.time,
      departmentName:
      reducedObject?.department_details?.departmentName,
      hospitalName: reducedObject?.hospital_details?.hospitalName,
      issuerName: reducedObject?.hospital_details?.hospitalName,
      issuerId: reducedObject?.hospitalId,
      issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
    };
    console.log('certificationValuesMainPage', certificationValues);
    const wrapper = await ConsultationCertificate({
      web3,
      address: accounts[0],
      netVer,
      certificationValues,
    });
    console.log('wrapper', wrapper);
    dispatch(setConsultationCertificate(wrapper));
   
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

//set consultation certificate
export const setConsultationCertificate =
  (props, navigate) => async (dispatch) => {
    let { data } = await postData('/consultation/certificate', props);
    console.log(data);
    dispatch(setSuccessMessage(data.message));
  };

// get all certificates
export const getAllCertificates = () => async (dispatch) => {
  const { data } = await getData('/consultation/list-certificates');
  dispatch({
    type: 'SET_CONSULTATION_CERTIFICATES',
    payload: data.data,
  });
};

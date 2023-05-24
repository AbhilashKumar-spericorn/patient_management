import { getData, postData } from '../../../services';
import Web3 from 'web3';
import {
  setSuccessMessage,
  setErrorMessage,
  loaderTrue,
  loaderFalse,
} from '../../../actions';
import VaccineCertificate from '../../../blockchain/VaccineCertificate';

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

//set certificate
export const setVaccinationCertificate =
  (props, navigate) => async (dispatch) => {
    let { data } = await postData('/vaccines/certificate', props);
    console.log(data);
    dispatch(setSuccessMessage(data.message));
  };

//to issue vaccination certificate
export const issueVaccineCertificate = (id) => async (dispatch) => {
  const { data } = await postData(`/vaccines/issue-certificate/${id}`);
  if (data.success) {
    // dispatch(setSuccessMessage(data.message));
    console.log('data.data', data.data);
    const reducedObject = data.data.reduce((result, obj) => {
      return { ...result, ...obj };
    }, {});

    console.log(reducedObject);

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);

    const certificationValues = {
      patientName: reducedObject?.login_details?.name,
      patientUUID: JSON.stringify(reducedObject?.login_details?.aadharNo),
      patientRegId: reducedObject?.loginId,
      vaccineName: reducedObject?.vaccine_details?.name,
      vaccineTakenDatetime: reducedObject?.time,
      disease: reducedObject?.vaccine_details?.disease,
      antigen: reducedObject?.vaccine_details?.antigen,
      issuerName: reducedObject?.hospital_details?.hospitalName,
      issuerId: reducedObject?.hospitalId,
      issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
    };
    console.log('certificationValuesMainPage', certificationValues);
    const wrapper = await VaccineCertificate({
      web3,
      address: accounts[0],
      netVer,
      certificationValues,
    });
    console.log('wrapper', wrapper);
    dispatch(setVaccinationCertificate(wrapper));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};


// get all certificates
export const getAllVCertificates = () => async (dispatch) => {
  const { data } = await getData('/vaccines/list-certificates');
  dispatch({
    type: 'SET_VACCINATION_CERTIFICATES',
    payload: data.data,
  });
};

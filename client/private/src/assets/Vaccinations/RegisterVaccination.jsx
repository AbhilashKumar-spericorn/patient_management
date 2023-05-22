import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import styled from 'styled-components';
// import './Vaccinations.css';
import Web3 from 'web3';
import wrappedTokenWithdraw from '../../blockchain/wrappedTokenWithdraw';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitals } from '../Consultations/action';
import { getVaccines } from './actions';

const FormContainer = styled.div`
  background-color: #222;
  padding: 20px;
  color: #6c63ff;
  padding-top: 10%;
  padding-bottom: 13%;
  padding-left: 30%;
`;

const FormField = styled.div`
  margin-bottom: 10px;
  width : 50%
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;


const ErrorMsg = styled.div`
  color: black;
  font-size: 14px;
`;

const validationSchema = Yup.object({
  hospital: Yup.string()
    .required('Hospital name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  vaccineName: Yup.string()
    .required('Vaccine name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
});

const RegisterVaccination = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHospitals());
    dispatch(getVaccines());
  }, []);

  const { hospital_details, vaccines } = useSelector((e) => e.hospital);

  const vaccineData = vaccines?.map((data, index) => {
    return (
      <option value={data._id} key={index}>
        {data.name}
      </option>
    );
  });

  const hospitalData = hospital_details?.map((data, index) => {
    return (
      <option value={data.hospitalName} key={index}>
        {data.hospitalName}
      </option>
    );
  });
  const walletisConnected = async () => {
    const web3 = new Web3(window.ethereum);
    const isConnected = await web3.eth.getAccounts();
    console.log('isConnected', isConnected);
  };
  useEffect(() => {
    walletisConnected();
  }, []);
  const formik = useFormik({
    initialValues: {
      hospital: '',
      vaccineName: '',
      date: '',
      time: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);
      const wrapper = await wrappedTokenWithdraw({
        web3,
        address: accounts[0],
        netVer,
      });

      //   console.log('wrappedTokenWithdraw', loader);
      // Handle form submission
    },
  });

  return (
    <div>
      <h2 style={{ color: 'black' }}>Vaccination Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormField>
          <Label htmlFor="hospital">Hospital:</Label>
          <select
                name="hospital"
                id="hospital"
                value={formik.values.hospital}
                onChange={formik.handleChange}
                className="form-control"
                onBlur={formik.handleBlur}
                placeholder='select hospital'

              >
                <option value="">Select Hospital</option>
                {hospitalData}
              </select>
          {formik.touched.hospital && formik.errors.hospital && (
            <ErrorMsg>{formik.errors.hospital}</ErrorMsg>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="vaccineName">Vaccine Name:</Label>
          <select
                name="vaccineName"
                id="vaccineName"
                value={formik.values.vaccineName}
                onChange={formik.handleChange}
                className="form-control"
                onBlur={formik.handleBlur}
              >
                <option value="">Select vaccine</option>
                {vaccineData}
              </select>
          
          {formik.touched.vaccineName && formik.errors.vaccineName && (
            <ErrorMsg>{formik.errors.vaccineName}</ErrorMsg>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="date">Date:</Label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Enter Date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className='form-control'
          />
          {formik.touched.date && formik.errors.date && (
            <ErrorMsg>{formik.errors.date}</ErrorMsg>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="time">Time:</Label>
          <input
            type="time"
            id="time"
            name="time"
            placeholder="Enter Time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className='form-control'
          />
          {formik.touched.time && formik.errors.time && (
            <ErrorMsg>{formik.errors.time}</ErrorMsg>
          )}
        </FormField>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <Link to={'/vaccinations'} className="btn btn-danger">
          back
        </Link>
      </form>
    </div>
  );
};

export default RegisterVaccination;

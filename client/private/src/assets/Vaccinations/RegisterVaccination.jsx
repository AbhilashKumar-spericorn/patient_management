// register vaccinations

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import styled from 'styled-components';
// import './Vaccinations.css';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitals } from '../Consultations/action';
import { getVaccines, registerVaccinations } from './actions';
import { loaderTrue } from '../../actions';
import Web3 from 'web3';
import wrappedTokenDeposit from '../../blockchain/ConsultationCertificate';

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
  width: 50%;
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
  hospitalId: Yup.string()
    .required('Hospital name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  vaccineName: Yup.string()
    .required('Vaccine name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
});

const RegisterVaccination = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHospitals());
    dispatch(getVaccines());
  }, []);

  const { hospital_details, vaccines } = useSelector((e) => e.hospital);

  const { loader } = useSelector((e) => e.msg);

  const vaccineData = vaccines?.map((data, index) => {
    return (
      <option value={data._id} key={index}>
        {data.name}
      </option>
    );
  });

  const hospitalData = hospital_details?.map((data, index) => {
    return (
      <option value={data._id} key={index}>
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
      hospitalId: '',
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
      // localStorage.setItem('walletAddress', accounts[0]);
      // const wrapper = await wrappedTokenDeposit({
      //   web3,
      //   address: accounts[0],
      //   netVer,
      // });
      const tokenAddress = '0x44B8363ED6e1424Fe8346F5c77883D69d8619f03';

      const toWei = async (web3, amount, decimals) => {
        return await web3.utils.toWei(
          parseFloat(amount).toFixed(decimals).toString(),
          'ether'
        );
      };

      const getGasPrice = async (web3) => {
        const gasPrice = await web3.eth.getGasPrice();
        return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
      };

      const AmountInWei = await toWei(web3, 0.001, 18);
      console.log('AmountInWei', AmountInWei);
      const GetGasPricesss = await getGasPrice(web3);
      const result = await web3.eth.sendTransaction({
        from: accounts[0],
        to: tokenAddress,
        value: AmountInWei,
        GetGasPricesss,
      });
      console.log('result', result);
      if (result) {
        console.log(values);
        dispatch(loaderTrue());
        dispatch(
          registerVaccinations({ values, result }, () =>
            navigate('/vaccinations')
          )
        );
      } else {
        console.log('error');
      }
    },
  });

  return loader ? (
    <Loader />
  ) : (
    <div>
      <h2 style={{ color: 'black' }}>Vaccination Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormField>
          <Label htmlFor="hospital">Hospital:</Label>
          <select
            name="hospitalId"
            id="hospitalId"
            value={formik.values.hospitalId}
            onChange={formik.handleChange}
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="select hospital"
          >
            <option value="">Select Hospital</option>
            {hospitalData}
          </select>
          {formik.touched.hospitalId && formik.errors.hospitalId && (
            <ErrorMsg>{formik.errors.hospitalId}</ErrorMsg>
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
            className="form-control"
          />
          {formik.touched.date && formik.errors.date && (
            <ErrorMsg>{formik.errors.date}</ErrorMsg>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="time">Time:</Label>
          <select
            name="time"
            className="form-control"
            id="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Time</option>
            <option value="9:00am-10:00am">9:00am - 10:00am</option>
            <option value="10:00am-11:00am">10:00am - 11:00am</option>
            <option value="11:00am-12:00pm">11:00am - 12:00pm</option>
            <option value="12:00pm-1:00pm">12:00pm - 1:00pm</option>
            <option value="2:00pm-3:00pm">2:00pm - 3:00pm</option>
            <option value="3:00pm-4:00pm">3:00pm - 4:00pm</option>
            <option value="4:00pm-5:00pm">4:00pm - 5:00pm</option>
          </select>
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

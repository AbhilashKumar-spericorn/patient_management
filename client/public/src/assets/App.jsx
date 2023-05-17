import React, { useEffect } from 'react';
import HomePage from './homepage/HomePage';
import ContactUs from './homepage/ContactUs';
import VerifyVaccine from './homepage/VerifyVaccine';
import VerifyConsultation from './homepage/VerifyConsultation';
import './styles/index.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetErrorMessage,resetSuccessMessage } from '../actions';

const toastConfig = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const App = () => {
  const dispatch = useDispatch();
  const { successMsg, errorMsg } = useSelector((e) => e.msg);

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMsg) {
      toast.error(errorMsg, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMsg, errorMsg]);

  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />;
          <Route path="/contact-us" element={<ContactUs />} />;
          <Route path="/verify-vaccine" element={<VerifyVaccine />} />;
          <Route path="/verify-consultation" element={<VerifyConsultation />} />;


        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

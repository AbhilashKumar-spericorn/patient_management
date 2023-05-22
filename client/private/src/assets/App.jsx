import React, { useEffect } from 'react';
import Home from './home/Home';
import Login from './authentication/Login';
import Registration from './authentication/Registration';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/Profile';
import Messages from './Dashboard/Messages';
import ReadMessage from './Dashboard/ReadMessage';
import EditMedInfo from './Dashboard/EditMedInfo';
import ReportOfDiseases from './Diseases/ReportOfDiseases';
import AddDisease from './Diseases/AddDisease';
import Consultation from './Consultations/Consultation';
import RegisterConsultations from './Consultations/RegisterConsultations';
import Vaccination from './Vaccinations/Vaccination';
import RegisterVaccination from './Vaccinations/RegisterVaccination';
import ChangePassword from './Dashboard/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetErrorMessage, resetSuccessMessage } from '../actions';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRouting';
import '../styles/index.css';

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
  const { role } = useSelector((e) => e.auth);
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
          <Route path="/" element={<Home />} />;
          <Route path="/login" element={<Login />} />;
          <Route path="/register" element={<Registration />} />;
          <Route path="/dashboard" element={<Dashboard />} />;
          <Route path="/profile" element={<Profile />} />;
          <Route path="/edit-medicalinfo" element={<EditMedInfo />} />;

          <Route path="/messages" element={<Messages />} />;
          <Route path="/change-password" element={<ChangePassword />} />;
          <Route path="/diseases" element={<ReportOfDiseases />} />;
          <Route path="/add-disease" element={<AddDisease />} />;
          <Route path="/consultation" element={<Consultation />} />;
          <Route path="/read-feedback/:id" element={<ReadMessage />} />
          <Route path="/vaccinations" element={<Vaccination />} />

          <Route path="/add-vaccinations" element={<RegisterVaccination />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

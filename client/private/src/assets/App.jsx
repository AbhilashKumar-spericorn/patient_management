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
import ConsultationCertficates from './Dashboard/ConsultationCertficates';
import VaccinationCertificates from './Dashboard/VaccinationCertificates';
import Vaccination from './Vaccinations/Vaccination';
import RegisterVaccination from './Vaccinations/RegisterVaccination';
import Transactions from './Transactions/Transactions';
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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/edit-medicalinfo"
            element={
              <PrivateRoute>
                <EditMedInfo />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/diseases"
            element={
              <PrivateRoute>
                <ReportOfDiseases />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/add-disease"
            element={
              <PrivateRoute>
                <AddDisease />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/consultation"
            element={
              <PrivateRoute>
                <Consultation />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/read-feedback/:id"
            element={
              <PrivateRoute>
                <ReadMessage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vaccinations"
            element={
              <PrivateRoute>
                <Vaccination />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-vaccinations"
            element={
              <PrivateRoute>
                <RegisterVaccination />
              </PrivateRoute>
            }
          />
           <Route
            path="/issued-cCertificates"
            element={
              <PrivateRoute>
                <ConsultationCertficates />
              </PrivateRoute>
            }
          />
           <Route
            path="/issued-VCertificates"
            element={
              <PrivateRoute>
                <VaccinationCertificates />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

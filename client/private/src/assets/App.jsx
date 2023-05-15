import React, { useEffect } from 'react';
import Home from './home/Home';
import Login from './authentication/Login';
import Registration from './authentication/Registration';
import Dashboard from './Dashboard/Dashboard';
import Messages from './Dashboard/Messages';
import ReadMessage from './Dashboard/ReadMessage';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetErrorMessage,resetSuccessMessage } from '../actions';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '../styles/index.css'

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
          <Route path="/messages" element={<Messages />} />;
          <Route
            path="/read-feedback/:id"
            element={
            //   <PrivateRoute>
                <ReadMessage />
            //   </PrivateRoute>
            }
          />



          
          {/* <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
      
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

//consultations

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Web3 from 'web3';
import wrappedTokenDeposit from '../../blockchain/wrappedTokenDeposit';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  fetchHospitals,
  fetchDepartments,
  fetchDoctors,
  registerConsultant,
  getConsultationData,
  getAllConsultations,
  issueConsultationCertificate
} from './action';
import DataTable, { createTheme } from 'react-data-table-component';

const Consultation = () => {
  const userRole = JSON.parse(localStorage.getItem('currentUser')).designation;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { userConsultationData, registeredConsultations } = useSelector(
    (e) => e.hospital
  );
  console.log(registeredConsultations);

  //theme for data table
  createTheme(
    'solarized',
    {
      text: {
        primary: 'yellow',
        secondary: 'white',
      },
      background: {
        default: '#002b36',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#073642',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    },
    'dark'
  );

  // data table value mapping
  const columns = [
    {
      name: 'hospital Name',
      selector: (row) => row?.hospitalId?.hospitalName,
    },
    {
      name: 'Department Name',
      selector: (row) => row?.departmentId?.departmentName,
    },
    {
      name: 'Doctor ',
      selector: (row) => row?.doctorId?.doctorName,
    },
  ];

  const columns2 = [
    {
      name: 'Date',
      selector: (row) => row?.date,
    },
    {
      name: 'Patient Name',
      selector: (row) => row?.login_details?.name,
    },
    {
      name: 'hospital Name',
      selector: (row) => row?.hospital_details?.hospitalName,
    },
    {
      name: 'Doctor  Name',
      selector: (row) => row?.doctor_details?.doctorName,
    },
    {
      name: 'Time',
      selector: (row) => row?.time,
    },
    {
      name: 'Action',

      selector: (row) => (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              // dispatch(dltRoute(row.id));
            }}
          >
            issue certificate
          </button>
        </div>
      ),
    },
  ];

  // dispatching actions

  useEffect(() => {
    dispatch(fetchHospitals());
    dispatch(fetchDepartments());
    dispatch(fetchDoctors());
    dispatch(getConsultationData());
    dispatch(getAllConsultations());
  }, []);


  // values
  const { hospital_details, department_details, doctor_details } = useSelector(
    (e) => e.hospital
  );

  


  // filtering drop down options
  useEffect(() => {
    if (selectedDepartment && selectedHospital) {
      const doctors = doctor_details?.filter(
        (doctor) =>
          doctor.department_details[0].departmentName === selectedDepartment &&
          doctor.hospital_details[0].hospitalName === selectedHospital
      );
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment, selectedHospital, doctor_details]);
  // console.log('filte', filteredDoctors);


// hospital data
  const hospitalData = hospital_details?.map((data, index) => {
    return (
      <option value={data.hospitalName} key={index}>
        {data.hospitalName}
      </option>
    );
  });

  //department data
  const departmentData = department_details?.map((data, index) => {
    return (
      <option value={data.departmentName} key={index}>
        {data.departmentName}
      </option>
    );
  });

  //doctor data
  const doctorData = filteredDoctors?.map((data, index) => {
    return (
      <option value={data.doctorName} key={index}>
        {data.doctorName}
      </option>
    );
  });

  // form initial values

  const [formData, setFormData] = useState({
    date: '',
    hospital: '',
    department: '',
    doctor: '',
    time: '',
  });

  const handleChange1 = (e) => {
    // setSelectedDepartment(e.target.value);
    const { name, value } = e.target;
    if (name === 'department') {
      setSelectedDepartment(value);
    } else if (name === 'hospital') {
      setSelectedHospital(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  //formik setting
  
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    resetForm,
  } = useFormik({
    validationSchema: Yup.object().shape({
      // hospital: Yup.string().required('hospital is Required'),
      // department: Yup.string().required('department is Required'),
      doctor: Yup.string().required('doctor is required'),
      date: Yup.date().required(' Date is required'),
      time: Yup.string().required('select time'),
    }),
    enableReinitialize: true,
    // initial values
    initialValues: {
      date: '',
      hospital: '',
      department: '',
      doctor: '',
      time: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // resetForm({ values: '' });
      values.hospital = selectedHospital;
      values.department = selectedDepartment;
      console.log('values', values);

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
        dispatch(registerConsultant({ values, result }, navigate));
      } else {
        console.log('error');
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row d-flex flex-row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100 w-75">
          <div className="mb-3">
            {userRole === 'Patient' ? (
              <button className="btn btn-info add-btn" onClick={toggleModal}>
                Register
              </button>
            ) : null}
            <div className="mt-5 ">
              {userRole === 'Patient' ? (
                <DataTable
                  columns={columns}
                  data={userConsultationData}
                  pagination
                  theme="solarized"
                />
              ) : ( <DataTable
                columns={columns2}
                data={registeredConsultations}
                pagination
                theme="solarized"
              />)}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
        shouldCloseOnEsc={false} // Prevent closing on Esc key
        contentLabel="Register Modal"
        className="custom-modal" // Add a custom class for the modal
        overlayClassName="custom-modal-overlay" // Add a custom class for the modal overlay
      >
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={values.date}
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.date && touched.date ? <div>{errors.date}</div> : null}
            </div>
            <div>
              <label>Choose Hospital:</label>
              <select
                name="hospital"
                id="hospital"
                // value={formData.hospital}
                onChange={handleChange1}
                className="form-control"
                onBlur={handleBlur}
              >
                <option value="">Select Hospital</option>
                {hospitalData}
              </select>
              {errors.hospital && touched.hospital ? (
                <div>{errors.hospital}</div>
              ) : null}
            </div>
            <div>
              <label>Choose Department:</label>
              <select
                name="department"
                // value={formData.department}
                className="form-control"
                onChange={handleChange1}
                onBlur={handleBlur}
                id="department"
              >
                <option value="">Select Department</option>
                {departmentData}
              </select>
              {errors.department && touched.department ? (
                <div>{errors.department}</div>
              ) : null}
            </div>
            <div>
              <label>Choose Doctor:</label>
              <select
                name="doctor"
                id="doctor"
                className="form-control"
                value={values.doctor}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Doctor</option>
                {doctorData}
              </select>
              {errors.doctor && touched.doctor ? (
                <div>{errors.doctor}</div>
              ) : null}
            </div>
            <div>
              <label>Time:</label>
              <select
                name="time"
                className="form-control"
                id="time"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
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
              {errors.time && touched.time ? <div>{errors.time}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
            <button className="btn btn-dark mt-5 mx-2" onClick={toggleModal}>
              back
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Consultation;

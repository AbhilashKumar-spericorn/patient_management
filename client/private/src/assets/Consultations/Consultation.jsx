//consultations

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Web3 from 'web3';
import Loader from '../Loader';
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
  issueConsultationCertificate,
  setConsultationCertificate,
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

  const { loader } = useSelector((e) => e.msg);
  // console.log(registeredConsultations);

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

  const { cCertificateInitials, success } = useSelector((e) => e.hospital);
  console.log(cCertificateInitials);
  //issue certificate
  const issueCertificate = async (id) => {
    // Perform action for the selected row
    console.log('Selected Row:', id);
    dispatch(issueConsultationCertificate(id));

    if (success) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const certificationValues = {
        patientName: cCertificateInitials?.login_details?.name,
        patientUUID: JSON.stringify(
          cCertificateInitials?.login_details?.aadharNo
        ),
        patientRegId: cCertificateInitials?.loginId,
        doctorName: cCertificateInitials?.doctor_details?.doctorName,
        consultationTime: cCertificateInitials?.time,
        departmentName:
          cCertificateInitials?.department_details?.departmentName,
        hospitalName: cCertificateInitials?.hospital_details?.hospitalName,
        issuerName: cCertificateInitials?.hospital_details?.hospitalName,
        issuerId: cCertificateInitials?.hospitalId,
        issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
      };
      console.log('certificationValuesMainPage', certificationValues);
      const wrapper = await wrappedTokenDeposit({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      console.log('wrapper', wrapper);
      dispatch(setConsultationCertificate(wrapper));
    }
  };

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

      selector: (row) =>
        row.status === 'pending' ? (
          <div>
            <button
              className="btn btn-danger"
              onClick={() => issueCertificate(row._id)}
            >
              issue certificate
            </button>
          </div>
        ) : 'issued',
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
        resetForm({ values: '' });
        setIsModalOpen(false);

        dispatch(
          registerConsultant({ values, result }, () =>
            navigate('/consultation')
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
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 p-0">
        <Navbar />
      </div>
      <div className="col-md-9">
        <div className="p-3 min-vh-100">
          <div className="mb-3">
            {userRole === 'Patient' && (
              <button className="btn btn-info add-btn" onClick={toggleModal}>
                Register
              </button>
            )}
            <div className="mt-5">
              {userRole === 'Patient' ? (
                <DataTable
                  columns={columns}
                  data={userConsultationData}
                  pagination
                  theme="solarized"
                />
              ) : (
                <DataTable
                  columns={columns2}
                  data={registeredConsultations}
                  pagination
                  theme="solarized"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Consultation;

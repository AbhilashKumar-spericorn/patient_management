//user profile

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  getBasicProfile,
  UpdateBasicProfile,
} from '../../actions';
import { useFormik } from 'formik';
import Modal from 'react-modal';
import * as Yup from 'yup';
import moment from 'moment';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getBasicProfile());
  }, [isModalOpen]);

  const { basicData } = useSelector((e) => e.auth);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsReadOnly(true);
  };

  const [isReadOnly, setIsReadOnly] = useState(false);

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
      name: Yup.string().required('Name is required'),
      aadharNo: Yup.string()
        .required('Aadhar number is required.')
        .matches(/^\d{12}$/, 'Invalid Aadhar number.'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('phone no is Required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      country: Yup.string().required('Country is required'),
      dob: Yup.date()
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth cannot be in the future.'),
      pinCode: Yup.string().required('PIN code is required'),
      state: Yup.string().required('State is required'),
    }),
    enableReinitialize: true,
    // initial values
    initialValues: {
      name: basicData ? basicData?.name : null,
      aadharNo: basicData ? basicData?.aadharNo : null,
      phoneNumber: basicData ? basicData?.phoneNumber : null,
      email: basicData ? basicData?.loginId?.email : null,
      country: basicData ? basicData?.country : null,
      dob: basicData ? moment(basicData?.dob).format('YYYY-MM-DD') : null,
      pinCode: basicData ? basicData?.pinCode : null,
      state: basicData ? basicData?.state : null,
    },
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
      console.log('values', values);
      dispatch(UpdateBasicProfile(values));
      setIsModalOpen(!isModalOpen);
    },
  });

  const { userdata } = useSelector((e) => e.auth);

  const details = userdata?.map((e) => {
    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="Admin"
                  className="rounded-circle p-1 bg-primary"
                  width="110"
                />
                <div className="mt-3">
                  <h4>{e?.name}</h4>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input type="text" className="form-control" value={e?.name} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Aadhar No</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.aadharNo}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Date of Birth</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={moment(e?.dob).format('YYYY-MM-DD')}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.login_info?.email}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.phoneNumber}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">country</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.country}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">State</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.state}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">pincode</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <input
                    type="text"
                    className="form-control"
                    value={e?.pinCode}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                  <button className="btn btn-primary" onClick={toggleModal}>
                    Edit data
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="d-flex align-items-center mb-3">
                    Medical info
                  </h5>
                  <p style={{ fontSize: '20px' }}>Blood group</p>
                  <p>{e?.medical_info?.blood}</p>
                  <p style={{ fontSize: '20px' }}>Height </p>
                  <p>{e?.medical_info?.height}cm</p>

                  <p style={{ fontSize: '20px' }}>Weight </p>
                  <p>{e?.medical_info?.weight}kg</p>

                  <p style={{ fontSize: '20px' }}>Gender </p>
                  <p>{e?.medical_info?.gender}</p>
                  <Link className="btn btn-primary" to={'/edit-medicalinfo'} >
                    Edit data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <div className="container">
            <div className="main-body">{details}</div>
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
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="form-outline form-white">
                    <label htmlFor="first_name" style={{ fontWeight: '700' }}>
                      Enter Your name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Enter Your name"
                    />

                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="form-outline form-white">
                    <label htmlFor="first_name" style={{ fontWeight: '700' }}>
                      Enter Your aadhar No
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="aadharNo"
                      name="aadharNo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.aadharNo}
                      placeholder="Enter Your aadharNo"
                    />

                    {errors.aadharNo && touched.aadharNo ? (
                      <div>{errors.aadharNo}</div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex mb-3 ">
                  <div className="form-outline form-white mx-2">
                    <label htmlFor="phoneNumber" style={{ fontWeight: '700' }}>
                      phone number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="phone number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div>{errors.phoneNumber}</div>
                    ) : null}
                  </div>{' '}
                  <div className="form-outline form-white">
                    <label htmlFor="email" style={{ fontWeight: '700' }}>
                      dob
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dob}
                      placeholder="Enter Your dob"
                    />

                    {errors.dob && touched.dob ? <div>{errors.dob}</div> : null}
                  </div>
                </div>
                <div className="row mb-3"></div>
                <div className="row mb-3">
                  <div className="form-outline form-white">
                    <label htmlFor="email" style={{ fontWeight: '700' }}>
                      email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      readOnly={isReadOnly}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter Your email"
                    />

                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-row mb-3">
                  <div className="form-outline form-white mx-2">
                    <label htmlFor="email" style={{ fontWeight: '700' }}>
                      country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      placeholder="Enter Your country"
                    />

                    {errors.country && touched.country ? (
                      <div>{errors.country}</div>
                    ) : null}
                  </div>
                  <div className="form-outline form-white">
                    <label htmlFor="email" style={{ fontWeight: '700' }}>
                      state
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      placeholder="Enter Your state"
                    />

                    {errors.state && touched.state ? (
                      <div>{errors.state}</div>
                    ) : null}
                  </div>
                </div>{' '}
                <div className="row mb-3">
                  <div className="form-outline form-white">
                    <label htmlFor="email" style={{ fontWeight: '700' }}>
                      pin code
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pinCode}
                      placeholder="Enter Your pinCode"
                    />

                    {errors.pinCode && touched.pinCode ? (
                      <div>{errors.pinCode}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-start mt-4">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  // onClick={toggleModal}
                >
                  update
                </button>
                <button
                  className="btn btn-dark  mt-4 mx-2"
                  onClick={toggleModal}
                >
                  back
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;

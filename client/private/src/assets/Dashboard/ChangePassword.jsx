//change-password

import React, { useRef, useEffect } from 'react';
import { changePass } from '../../actions';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Navbar from './Navbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const secretPass = 'XkhZG4fW2t2W';

  const encryptData = (txt) => {
    const data = CryptoJS.AES.encrypt(txt, secretPass).toString();

    return data;
  };

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
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    enableReinitialize: true,
    // initial values
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
      console.log('values', values);
      const cPs = encryptData(values.currentPassword);
      values.currentPassword = cPs;
      const nPs = encryptData(values.newPassword);
      values.newPassword = nPs;
      const cnPs = encryptData(values.confirmPassword);
      values.confirmPassword = cnPs;
      console.log('values', values);

        dispatch(changePass(values));
    },
  });

  return (
    <section>
      <h1 className="title">Change Password</h1>

      <form onSubmit={handleSubmit} className="px-4">
        <div className="row align-items-center w-50">
          <label htmlFor="photos">Enter your current password </label>
          <div className="col mt-4 ">
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="form-control"
              placeholder="current password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
            />
            {errors.currentPassword && touched.currentPassword ? (
              <div>{errors.currentPassword}</div>
            ) : null}
          </div>
        </div>
        <div className="row align-items-center mt-4 w-50">
          <label htmlFor="photos"> new password </label>

          <div className="col">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-control"
              placeholder="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
            />
            {errors.newPassword && touched.newPassword ? (
              <div>{errors.newPassword}</div>
            ) : null}
          </div>
        </div>
        <div className="row align-items-center mt-4 w-50">
          <label htmlFor="photos"> confirm password </label>

          <div className="col">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
          </div>
        </div>

        <div className="row justify-content-start mt-4">
          <div className="col">
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
            <Link className='btn btn-info mx-4 mt-4' to={'/dashboard'}>back</Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicalProfile, UpdateMedInfo } from '../../actions';

const EditMedInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMedicalProfile());
  }, []);

  const { medicalData } = useSelector((e) => e.auth);
  console.log('first', medicalData);

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
      blood: Yup.string().required('Blood type is required'),
      height: Yup.number()
        .required('Height is required.')
        .positive('Height must be a positive number.')
        .integer('Height must be an integer.')
        .test(
          'is-cm',
          'Height must be in between 100 and 250.',
          (value) => value >= 0 && value <= 250
        ),
      weight: Yup.number()
        .required('Weight is required.')
        .min(0, 'Weight must be greater than or equal to 0.')
        .max(180, 'Weight must be less than or equal to 180.'),

      gender: Yup.string().required('Gender is required'),
    }),
    enableReinitialize: true,
    // initial values
    initialValues: {
      blood: medicalData ? medicalData?.blood : '',
      height: medicalData ? medicalData?.height : '',
      weight: medicalData ? medicalData?.weight : '',
      gender: medicalData ? medicalData?.gender : '',
    },
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
      console.log('values', values);
      dispatch(UpdateMedInfo(values, () => navigate('/profile')));
    },
  });

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="col-lg-6 bg-indigo text-white">
          <div className="p-5">
            <h3 className="fw-normal mb-5" style={{ color: 'white' }}>
              {' '}
              Health Information
            </h3>

            <div className="mb-4 pb-2">
              <label htmlFor="blood">Blood group:</label>
              <select
                name="blood"
                id="blood"
                className="form-control"
                value={values.blood}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.blood && touched.blood ? <div>{errors.blood}</div> : null}
            </div>

            <div className="row">
              <div className="col-md-6 mb-4 pb-2">
                <div className="form-outline">
                  <label htmlFor="email" style={{ fontWeight: '700' }}>
                    Height
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="height"
                    name="height"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.height}
                    placeholder="Enter Your height"
                  />

                  {errors.height && touched.height ? (
                    <div>{errors.height}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6 mb-4 pb-2">
                <div className="form-outline">
                  <label htmlFor="email" style={{ fontWeight: '700' }}>
                    Weight
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weight"
                    name="weight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.weight}
                    placeholder="Enter Your weight"
                  />

                  {errors.weight && touched.weight ? (
                    <div>{errors.weight}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4 pb-2">
              <div>
                <label htmlFor="gender">Gender</label>
                <div>
                  <label htmlFor="male" className="mx-1">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.gender === 'male'}
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="mx-1">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.gender === 'female'}
                    />
                    Female
                  </label>
                </div>
                {errors.gender && touched.gender ? (
                  <div>{errors.gender}</div>
                ) : null}
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              update
            </button>
            <Link to={'/profile'} className="btn btn-warning mx-3">
              back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMedInfo;

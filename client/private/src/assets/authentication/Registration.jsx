//patient registration page

import React,{useState,useEffect} from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  aadharNo: Yup.string().required('Aadhar number is required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('phone no is Required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
  .required('No password provided.')
  .min(4, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirm: Yup.string()
  .required('Please confirm your password.')
  .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  country: Yup.string().required('Country is required'),
  dob: Yup.date().required('Date of birth is required'),
  pinCode: Yup.string().required('PIN code is required'),
  state: Yup.string().required('State is required'),
  blood: Yup.string().required('Blood type is required'),
  height: Yup.number().required('Height is required'),
  weight: Yup.number().required('Weight is required'),
  gender: Yup.string().required('Gender is required'),
  });

const Registration = () => {

  const dispatch = useDispatch()
  return (
    <section className='register-form' >
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="card card-registration card-registration-2" style={{borderRadius: "15px"}}>
            <div className="card-body p-0">
            <Formik
                initialValues={{
                  // initial values
                  name: '',
                  aadharNo:'',
                  phoneNumber:'',
                  email:'',
                  password : '',
                  confirm :'',
                  country:'',
                  dob:'',
                  pinCode:'',
                  state:'',
                  blood:'',
                  height:'',
                  weight:'',
                  gender:''
                }}
                // validation
                validationSchema={signUpSchema}
                // on submit values
                onSubmit={(values, { resetForm }) => {
                  // resetForm({ values: '' });
                  console.log('values', values);
                  dispatch(
                    // getDriverData(values, () => navigate('/driver-details'))
                  );
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (

              <form  onSubmit={handleSubmit}> 
              <div className="row g-0">
        <div className="col-lg-6">
                <div className="p-5">
                    <h3 className="fw-normal mb-5">Basic Details</h3>
  
                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
                      <label htmlFor="first_name" style={{ fontWeight: '700' }}>
                        Enter Your  name
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
  
                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
                      <label htmlFor="first_name" style={{ fontWeight: '700' }}>
                        Enter Your  aadhar No
                      </label>
                      <input
                        type="text"
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
  
                    <div className="row">
                      <div className="col-md-5 mb-4 pb-2">
  
                        <div className="form-outline form-white">
                        <label
                          htmlFor="phoneNumber"
                          style={{ fontWeight: '700' }}
                        >
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
                        </div>
  
                      </div>
                      <div className="col-md-7 mb-4 pb-2">
  
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

                      {errors.dob && touched.dob ? (
                        <div>{errors.dob}</div>
                      ) : null}
                        </div>
  
                      </div>
                    </div>
                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
                      <label htmlFor="email" style={{ fontWeight: '700' }}>
                        email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
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
  

                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
                      <label htmlFor="email" style={{ fontWeight: '700' }}>
                      password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter Your password"
                      />

                      {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                      ) : null}
                      </div>
                    </div>


                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
                      <label htmlFor="email" style={{ fontWeight: '700' }}>
                      confirm password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm"
                        name="confirm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm}
                        placeholder="Enter password again"
                      />

                      {errors.confirm && touched.confirm ? (
                        <div>{errors.confirm}</div>
                      ) : null}
                      </div>
                    </div>

                    <div className="mb-4 pb-2">
                      <div className="form-outline form-white">
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
                    </div>
  
                    <div className="row">
                      <div className="col-md-5 mb-4 pb-2">
  
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
  
                      </div>
                      <div className="col-md-7 mb-4 pb-2">
  
                        <div className="form-outline form-white">
                        <label htmlFor="email" style={{ fontWeight: '700' }}>
                        pin code
                      </label>
                      <input
                        type="text"
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
  
              
  
                    <button type="submit" className="btn btn-dark"
                      data-mdb-ripple-color="dark">Register</button>
  
                  </div>
                </div>
                <div className="col-lg-6 bg-indigo text-white">
                <div className="p-5">
                    <h3 className="fw-normal mb-5" style={{color: "white"}}> Health Information</h3>
  
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
                             <option value="" disabled>Select Blood Group</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
                          </select>
                          {errors.blood && touched.blood ? (
                            <div>{errors.blood}</div>
                          ) : null}
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
            <div >
              <label className='mx-1'>
                <input type="radio" name="gender" value="male" />
                Male
              </label>
              <label className='mx-1'>
                <input type="radio" name="gender" value="female" />
                Female
              </label>
             
            </div>
            {errors.gender && touched.gender ? (
                        <div>{errors.gender}</div>
                      ) : null}
          </div>
                    </div>
  
                   
  
                   
  
                  </div>

                </div>
              </div>

              </form>
 )}
 </Formik>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Registration
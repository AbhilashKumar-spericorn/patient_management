import React, { useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Consultation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      dailyWage: Yup.string().required('wage is Required'),
      bata: Yup.string().required('bata is Required'),
      shift: Yup.string().required('shift is required'),
    }),
    enableReinitialize: true,
    // initial values
    initialValues: {
      dailyWage: '',
      bata: '',
      shift: '',
    },
    onSubmit: (values, { resetForm }) => {
      // resetForm({ values: '' });

      console.log('values', values);
      
    },
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <div className="mb-3">
            
            <button className="btn btn-info add-btn" onClick={toggleModal}>
              Register
            </button>
            
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
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col mt-4">
                <label htmlFor="file-input" className="input-label">
                  enter daily wage
                </label>
                <input
                  type="text"
                  name="dailyWage"
                  id="dailyWage"
                  className="form-control w-25"
                  placeholder="wage"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dailyWage}
                />
                {errors.dailyWage && touched.dailyWage ? (
                  <div>{errors.dailyWage}</div>
                ) : null}
              </div>
            </div>
            <div className="row align-items-center mt-4">
              <div className="col">
                <label htmlFor="file-input" className="input-label">
                  bata
                </label>
                <input
                  type="text"
                  id="bata"
                  name="bata"
                  className="form-control w-25"
                  placeholder="bata"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bata}
                />
                {errors.bata && touched.bata ? <div>{errors.bata}</div> : null}
              </div>
            </div>
            <div className="row align-items-center mt-4">
              <div className="col">
                <label htmlFor="file-input" className="input-label">
                  select shift
                </label>
                <select
                  name="shift"
                  value={values.shift}
                  onChange={handleChange}
                  className="form-control w-25"
                  onBlur={handleBlur}
                  style={{ display: 'block' }}
                >
                  <option value="">Select an shift</option>

                  <option value="morning">morning</option>
                  <option value="night">night</option>
                </select>
                {errors.shift && touched.shift ? (
                  <div>{errors.shift}</div>
                ) : null}
              </div>
            </div>

            <div className="row justify-content-start mt-4">
              <div className="col">
                <button type="submit" className="btn btn-primary mt-4" onClick={toggleModal}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Consultation;

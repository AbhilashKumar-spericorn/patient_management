import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchHospitals, fetchDepartments, fetchDoctors } from './action';

const Consultation = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(fetchHospitals());
    dispatch(fetchDepartments());
    dispatch(fetchDoctors());
  }, []);

  const { hospital_details, department_details, doctor_details } = useSelector(
    (e) => e.hospital
  );

  console.log(doctor_details);

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
  console.log('filte', filteredDoctors);

  const hospitalData = hospital_details?.map((data, index) => {
    return (
      <option value={data.hospitalName} key={index}>
        {data.hospitalName}
      </option>
    );
  });
  const departmentData = department_details?.map((data, index) => {
    return (
      <option value={data.departmentName} key={index}>
        {data.departmentName}
      </option>
    );
  });
  const doctorData = filteredDoctors?.map((data, index) => {
    return (
      <option value={data.doctorName} key={index}>
        {data.doctorName}
      </option>
    );
  });

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
      date:Yup.date().required(' Date is required'),
      time: Yup.string().required('select time')
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
    onSubmit: (values, { resetForm }) => {
      // resetForm({ values: '' });
      values.hospital = selectedHospital;
      values.department = selectedDepartment;
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
              {errors.time && touched.time ? (
                <div>{errors.time}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Consultation;

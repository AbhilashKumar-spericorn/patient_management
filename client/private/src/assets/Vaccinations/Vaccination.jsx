// list of vaccinations

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVaccinationData,
  getAllVaccinations,
  issueVaccineCertificate,
} from './actions';
import DataTable, { createTheme } from 'react-data-table-component';
import Loader from '../Loader';

const Vaccination = () => {
  const userRole = JSON.parse(localStorage.getItem('currentUser')).designation;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccinationData());
    dispatch(getAllVaccinations());
  }, []);

  const { userVaccineData, registeredVaccinations } = useSelector(
    (e) => e.hospital
  );

  const { loader } = useSelector((e) => e.msg);

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

  // set certificate
  const issueVCertificate = async (id) => {
    // Perform action for the selected row
  
    dispatch(issueVaccineCertificate(id));
  };

  const columns = [
    {
      name: 'hospital Name',
      selector: (row) => row?.hospitalId?.hospitalName,
    },
    {
      name: 'vaccine Name',
      selector: (row) => row?.vaccineId?.name,
    },
    {
      name: 'time ',
      selector: (row) => row?.date,
    },
  ];

  const columns2 = [
    {
      name: 'Patient Name',
      selector: (row) => row?.login_details?.name,
    },
    {
      name: 'hospital Name',
      selector: (row) => row?.hospital_details?.hospitalName,
    },
    {
      name: 'vaccine Name',
      selector: (row) => row?.vaccination_details?.name,
    },
    {
      name: 'Action',

      selector: (row) =>
        row.status === false ? (
          <div>
            <button
              className="btn btn-danger"
              onClick={() => issueVCertificate(row._id)}
            >
              issue certificate
            </button>
          </div>
        ) : (
          'issued'
        ),
    },
  ];

  // console.log('first', registeredVaccinations);

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
              {userRole === 'Patient' ? (
                <Link to={'/add-vaccinations'} className="btn btn-info">
                  register vaccine
                </Link>
              ) : null}
            </div>
            <div className="mt-5">
              {userRole === 'Patient' ? (
                <DataTable
                  columns={columns}
                  data={userVaccineData}
                  pagination
                  theme="solarized"
                />
              ) : (
                <DataTable
                  columns={columns2}
                  data={registeredVaccinations}
                  pagination
                  theme="solarized"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVaccinationData, getAllVaccinations } from './actions';
import DataTable, { createTheme } from 'react-data-table-component';

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
      selector: (row) => row?.hospital_details?.hospitalName
    },
    {
      name: 'vaccine Name',
      selector: (row) => row?.vaccination_details?.name
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

  console.log('first', registeredVaccinations);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <div className="container">
            <div className="main-body">
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

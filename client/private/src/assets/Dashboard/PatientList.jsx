import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { createTheme } from 'react-data-table-component';
import { getAllPatients } from '../../actions';
import moment from 'moment';

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPatients());
  }, []);

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

  const { patients } = useSelector((e) => e.hospital);
  console.log('patient', patients);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      name: ' Id',
      selector: (row) => row?.aadharNo,
    },
    {
      name: 'Name',
      selector: (row) => row?.name,
    },
    {
      name: 'Date of Birth',
      selector: (row) => moment(row?.dob).format('DD-MM-YYYY'),
    },
    {
      name: 'Phone Number',
      selector: (row) => row?.phoneNumber,
    },
    {
      name: 'State',
      selector: (row) => row?.state,
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Navbar />
        </div>
        <div className="col-md-9">
          <div className="p-3 min-vh-100">
            <div className="mt-5">
              <input
                type="text"
                className='form-control w-25 mb-4'
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by name"
              />
              <DataTable
                columns={columns}
                data={filteredPatients}
                pagination
                theme="solarized"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;

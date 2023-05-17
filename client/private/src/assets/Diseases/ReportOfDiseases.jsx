import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfDiseases } from './action';

const ReportOfDiseases = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfDiseases());
  }, []);

  const { report } = useSelector((e) => e.hospital);
  console.log('report', report)
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <div className="mb-3">
            {/* { userRole === 'Admin'|| permissionAllowed?.includes('Add') ? ( */}
            <Link to="/add-disease">
              <button className="btn btn-info add-btn">
                Report a disease{' '}
              </button>
            </Link>
            {/* ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOfDiseases;

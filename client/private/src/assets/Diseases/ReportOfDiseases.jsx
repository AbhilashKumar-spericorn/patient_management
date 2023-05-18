import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfDiseases } from './action';
import moment from 'moment';

const ReportOfDiseases = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfDiseases());
  }, []);

  const { report } = useSelector((e) => e.hospital);

  console.log('report', report);
  const reducedObject = report.reduce((result, obj) => {
    return { ...result, ...obj };
  }, {});

  console.log(reducedObject);

  const tableData = reducedObject?.diseases?.map((data, index) => {
    return (
      <tr>
        <td>{data?.diseaseName}</td>
        <td>{moment(data?.startDate).format('YYYY-MM-DD')}</td>
        <td>{data?.remarks}</td>
      </tr>
    );
  });

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
          <div className="d-flex justify-content-around">
            {' '}
            <table class="table table-dark mt-5">
              <thead>
                <tr>
                  <th scope="col">disease Name</th>
                  <th scope="col">start date</th>
                  <th scope="col">remarks</th>
                </tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOfDiseases;

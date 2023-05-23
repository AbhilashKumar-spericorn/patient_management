//list all all transactions

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from './action';

const Transactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const { transactionData } = useSelector((e) => e.hospital);
  console.log(transactionData);

  const tableData = transactionData?.map((data, index) => {
    return (
      <tr>
        <td>{data?.user_details?.name}</td>
        <td>{data?.appointmentType}</td>

        <td>{data?.status}</td>
      </tr>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <Link to="/add-drivers">
            <button className="btn btn-info add-btn">Add driver</button>
          </Link>

          <div className="d-flex justify-content-around">
            {' '}
            <table class="table table-dark mt-5">
              <thead>
                <tr>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Appointment Type</th>
                  <th scope="col">Payment status</th>
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

export default Transactions;

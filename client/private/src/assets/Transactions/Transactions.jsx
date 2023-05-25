//list all all transactions

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from './action';

const Transactions = () => {
  const dispatch = useDispatch();
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const { transactionData } = useSelector((e) => e.hospital);
  console.log(transactionData);

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setFilteredTransaction(transactionData);
    } else {
      const filtered = transactionData.filter(
        (item) => item.appointmentType.toLowerCase() === value.toLowerCase()
      );
      setFilteredTransaction(filtered);
    }
  };
 
  
  const tableData =   filteredTransaction.length > 0 ? (  filteredTransaction?.map((data, index) => {
    return (
      <tr>
        <td>{data?.user_details?.name}</td>
        <td>{data?.appointmentType}</td>

        <td>{data?.status}</td>
      </tr>
    );
  })
  ): (
    transactionData?.map((data, index) => {
      return (
        <tr>
          <td>{data?.user_details?.name}</td>
          <td>{data?.appointmentType}</td>
  
          <td>{data?.status}</td>
        </tr>
      );
    })
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Navbar />
        </div>
        <div className="col-md-9">
          <div className="p-3 min-vh-100">
            <div className="mb-3">
              <Link to="/add-drivers">
                <button className="btn btn-info add-btn">Add driver</button>
              </Link>
              <div className="filter-container " style={{ margin: '3rem' }}>
                <label htmlFor="appointmentFilter" className="h4">
                  Filter by Appointment Type:
                </label>
                <select
                  id="appointmentFilter"
                  onChange={handleFilter}
                  className="border-black-3"
                >
                  <option value="all">All</option>
                  <option value="consultation">consultation</option>
                  <option value="vaccination">vaccination</option>
                 
                </select>
              </div>
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
      </div>
    </div>
  );
};

export default Transactions;

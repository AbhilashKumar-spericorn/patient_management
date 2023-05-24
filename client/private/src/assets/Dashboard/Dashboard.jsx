// dashboard

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import { getAllPatients } from '../../actions';
import { getConsultationData } from '../Consultations/action';
import { getListOfDiseases } from '../Diseases/action';
import { getAllTransactions } from '../Transactions/action';
import ConsultationGraph from './Graph';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPatients());
    dispatch(getConsultationData());
    dispatch(getListOfDiseases());
    dispatch(getAllTransactions());
  }, []);

  const { patients, userConsultationData, report, transactionData } =
    useSelector((e) => e.hospital);
  console.log('first', patients);
  const reducedObject = report.reduce((result, obj) => {
    return { ...result, ...obj };
  }, {});

  const userRole = JSON.parse(localStorage.getItem('currentUser')).designation;

  //   const { grantedPermissions } = useSelector((state) => state.auth);

  //   let array = grantedPermissions?.filter((item) => item.menu === 'Dashboard');

  //   let permissionAllowed = array?.map((e) => e.subMenu);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Navbar />
        </div>
        <div className="col-md-9">
          <div className="p-3 min-vh-100">
            <div className="mb-3">
              <section>
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    {userRole === 'Patient' ? (
                      <div className="card" style={{ width: '12rem' }}>
                        <div className="card-body">
                          <h5 className="card-title">No of consultations</h5>
                          <p className="card-text">
                            {userConsultationData.length}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {userRole === 'Admin' ? (
                      <div className="card" style={{ width: '12rem' }}>
                        <div className="card-body">
                          <h5 className="card-title">No of Patients</h5>
                          <p className="card-text">{patients.length}</p>
                        </div>
                      </div>
                    ) : null}
                    {userRole === 'Patient' ? (
                      <div className="card" style={{ width: '12rem' }}>
                        <div className="card-body">
                          <h5 className="card-title">No of diseases</h5>
                          <p className="card-text">
                            {reducedObject?.diseases?.length}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {userRole === 'Admin' ? (
                      <div className="card" style={{ width: '12rem' }}>
                        <div className="card-body">
                          <h5 className="card-title">Total payment</h5>
                          <p className="card-text">{transactionData.length}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="card" style={{ width: '12rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">Vaccination taken</h5>
                        <p className="card-text">3</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <ConsultationGraph/> */}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

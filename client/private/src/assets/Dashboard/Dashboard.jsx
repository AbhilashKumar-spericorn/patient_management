// dashboard

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';

const Dashboard = () => {
  const dispatch = useDispatch();

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
                    {/* {userRole=== 'Admin' || permissionAllowed?.includes('no_of_messages') ? ( */}
                    <div className="card" style={{ width: '12rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">No of consultations</h5>
                        <p className="card-text">1</p>
                      </div>
                    </div>
                    {/* // ) : null} */}
                    {/* {userRole=== 'Admin' || permissionAllowed?.includes('no_of_drivers') ? ( */}
                    <div className="card" style={{ width: '12rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">No of diseases</h5>
                        <p className="card-text">4</p>
                      </div>
                    </div>
                    {/* ) : null} */}
                    <div className="card" style={{ width: '12rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">Total payment</h5>
                        <p className="card-text">5</p>
                      </div>
                    </div>
                    <div className="card" style={{ width: '12rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">Vaccination taken</h5>
                        <p className="card-text">3</p>
                      </div>
                    </div>
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

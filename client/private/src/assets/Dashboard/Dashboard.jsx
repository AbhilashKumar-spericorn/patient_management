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
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <section>
           
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

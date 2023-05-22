import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Vaccination = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm p-3 min-vh-100">
          <div className="container">
            <div className="main-body">
              <Link  to={'/add-vaccinations'} className='btn btn-info'>register vaccine</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;

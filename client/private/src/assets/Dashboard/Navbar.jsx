// inner navbar

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setLogout } from '../../actions';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(setLogout(() => navigate('/login')));
  };

  const userRole = JSON.parse(localStorage.getItem('currentUser')).designation;

  //   const { grantedPermissions } = useSelector((state) => state.auth);

  //   let array = grantedPermissions?.filter((item) => item.menu === 'Admin');

  //   let permissionAllowed = array?.map((e) => e.subMenu);

  return (
    <div className="col-sm-auto bg-dark sticky-top min-vh-100">
      <div className="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
        <a
          href="/dashboard"
          className="d-block p-3 link-white text-decoration-none pb-3"
          title=""
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
        >
          {' '}
          CareCompass
          <i className="bi-truck fs-1"></i>
        </a>

        <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto ">
          <li className="nav-item my-1">
            <Link
              to={'/dashboard'}
              className="nav-link text-white fw-bold fs-4"
            >
              <i className="bi bi-list fs-3"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link to={'/profile'} className="nav-link text-white fw-bold fs-4">
              <i className="bi-house fs-3"></i> Profile
            </Link>
          </li>
          {userRole === 'Patient' ? (
            <li className="nav-item my-1 ">
              <Link
                to={'/diseases'}
                className="nav-link text-white fw-bold fs-4"
              >
                <i className="bi-person fs-3"></i> diseases
              </Link>
            </li>
          ) : null}

          <li className="nav-item my-1 ">
            <Link
              to={'/vaccinations'}
              className="nav-link text-white fw-bold fs-4"
            >
              <i className="bi-truck fs-3"></i> vaccinations
            </Link>
          </li>

          <li className="nav-item my-1">
            <Link
              to={'/consultation'}
              className="nav-link text-white fw-bold fs-4"
            >
              <i className="bi-people fs-3"></i> Consultations
            </Link>
          </li>

          <li className="nav-item my-1">
            <Link
              to={'/change-password'}
              className="nav-link text-white fw-bold fs-4"
            >
              <i className="bi-speedometer2 fs-3"></i> change password
            </Link>
          </li>
          {userRole === 'Admin' ? (
            <li className="nav-item my-1">
              <Link
                to={'/transactions'}
                className="nav-link text-white fw-bold fs-4"
              >
                <i className=" bi bi-cash fs-3"></i> Transactions
              </Link>
            </li>
          ) : null}

          {userRole === 'Admin' ? (
            <li className="nav-item my-1">
              <Link
                to={'/permissions'}
                className="nav-link text-white fw-bold fs-4"
              >
                <i className=" bi bi-lock fs-3"></i> Permissions
              </Link>
            </li>
          ) : null}

          {userRole === 'Admin' || userRole === 'Manager' ? (
            <li className="nav-item my-1">
              <Link
                to={'/messages'}
                className="nav-link text-white fw-bold fs-4"
              >
                <i className=" bi bi-book fs-3"></i> Messages
              </Link>
            </li>
          ) : null}
          <li className="nav-item my-1">
            <button
              className="nav-link text-white fw-bold fs-4"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

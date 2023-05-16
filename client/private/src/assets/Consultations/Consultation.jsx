import React from 'react'
import Navbar from '../Dashboard/Navbar'
import { Link } from 'react-router-dom'

const Consultation = () => {
  return (
    <div className="container-fluid">
    <div className="row">
      <Navbar />
      <div className="col-sm p-3 min-vh-100">
        <div className="mb-3">
          {/* { userRole === 'Admin'|| permissionAllowed?.includes('Add') ? ( */}
            <Link to="/add-consultation">
              <button className="btn btn-info add-btn">Register</button>
            </Link>
          {/* ) : null} */}
        </div>
   </div>
    </div>
  </div>
  )
}

export default Consultation
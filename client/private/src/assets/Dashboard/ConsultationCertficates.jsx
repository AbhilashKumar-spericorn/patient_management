import React, { useEffect } from 'react';
import Navbar from '../Dashboard/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCertificates } from '../Consultations/action';

const ConsultationCertficates = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCertificates());
  }, []);

  const { consultationCertificates } = useSelector((e) => e.hospital);
  console.log('first', consultationCertificates);
  
  const tableData = consultationCertificates?.map((data, index) => {
    return (
      <tr>
        <td>{data?.certificateNumber}</td>
        <td>{data?.patientRegId}</td>
        <td>{data?.patientName}</td>
        <td>{data?.issuerId}</td>
        <td>{data?.doctorName}</td>
        <td>{data?.hospitalName}</td>
        <td>{data?.issuerName}</td>
        <td>{data?.issuedDateTime}</td>
      </tr>
    );
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Navbar />
        </div>
        <div className="col-md-9">
          <div className="p-3 min-vh-100">
            <div className="mb-3">
           
            <div style={{height: "300px",overflowY: "scroll"}} >
  <table class="table table-dark mt-5">
    <thead>
      <tr>
        <th scope="col">Certificate Number</th>
        <th scope="col">Patient Id</th>
        <th scope="col">Patient Name</th>
        <th scope="col">issuer id</th>
        <th scope="col">Doctor Name</th>
        <th scope="col">Hospital Name</th>
        <th scope="col">issuer Name</th>
        <th scope="col">issuedDateTime</th>
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

export default ConsultationCertficates;

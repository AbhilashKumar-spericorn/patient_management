import React, { useEffect } from 'react';
import Navbar from '../Dashboard/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVCertificates } from '../Vaccinations/actions';

const VaccinationCertificates = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllVCertificates());
    }, []);
    const { vaccinationCertificates } = useSelector((e) => e.hospital);
  console.log('first', vaccinationCertificates);

  const tableData = vaccinationCertificates?.map((data, index) => {
    return (
      <tr>
        <td>{data?.certificateNumber}</td>
        <td>{data?.patientRegId}</td>
        <td>{data?.patientName}</td>
        <td>{data?.issuerId}</td>
        <td>{data?.vaccineName}</td>
        <td>{data?.disease}</td>
        <td>{data?.antigen}</td>
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
      <th scope="col">vaccine Name</th>
      <th scope="col">disease Name</th>
      <th scope="col">Antigen</th>
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
  )
}

export default VaccinationCertificates
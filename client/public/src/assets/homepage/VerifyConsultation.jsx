import React, { useState } from 'react';
import Web3 from 'web3';
import consultationCertificateVerificationFunction from '../../blockchain/certificateVerificationFunction';

const VerifyConsultation = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [result, setCode] = useState({});

  const handleCertificateNumberChange = (e) => {
    setCertificateNumber(e.target.value);
  };

  const verifyConsultation = async (e) => {
    e.preventDefault();
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();

    const data = await consultationCertificateVerificationFunction({
      web3,
      certificateNumber,
    });
    console.log('data', data)
    const obj = decodedCertificateData(data);
    console.log(obj);
    setCode(obj);
  };
  const decodedCertificateData = (data) => {
    const startTimestamp = data.issuedDateTime; // Example start timestamp
    const endTimestamp = data.consultationTime;
    const startDate = new Date(startTimestamp * 1000);
    const endDate = new Date(endTimestamp * 1000);
    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startAMPM = startHours >= 12 ? 'PM' : 'AM';
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';

    const returnedCertificates = {
      certificateNumber: data.certificateNumber,
      patientName: Web3.utils.hexToUtf8(data.patientName),
      patientUUID: Web3.utils.hexToUtf8(data.patientUUID),
      patientRegId: data.patientRegId,
      doctorName: Web3.utils.hexToUtf8(data.doctorName),
      consultationTime: endHours + ':00' + endAMPM,
      departmentName: Web3.utils.hexToUtf8(data.departmentName),
      hospitalName: Web3.utils.hexToUtf8(data.hospitalName) + 'Hospitals',
      issuerName: Web3.utils.hexToUtf8(data.issuerName),
      issuerId: Web3.utils.hexToUtf8(data.issuerId),
      issuedDateTime: startHours + ':00' + startAMPM,
    };
    return returnedCertificates;
  };
  return (
    <div className="container mt-5 mb-4">
      <h3
        className="text-center"
        style={{ fontSize: '30px', fontWeight: '600' }}
      >
        Verify Consultation Certificate
      </h3>

      <form class="form-inline" onSubmit={verifyConsultation}>
        <div className="form-group ml-5 d-flex justify-content-center">
          <label class="sr-only" for="inputName">
            consultation
          </label>{' '}
          <input
            type="text"
            class="form-control w-50"
            id="consultation"
            placeholder="consultation"
            value={certificateNumber}
            onChange={handleCertificateNumberChange}
            required
          />
          <button className="btn btn-danger mx-4">Verify</button>
        </div>
        {result ? (
          <div className="container mt-4 d-flex justify-content-center">
            <div class="card" style={{ width: '18rem' }}>
              <div class="card-body">
                <h5 class="card-title">Patient Name:{result?.patientName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  hospital Name:{result?.hospitalName}
                  <br />
                  department:{result?.departmentName}
                </h6>
                <p class="card-text">
                  Certificate Number:{result?.certificateNumber}
                </p>
                <p class="card-text">Issuer:{result?.issuerName}</p>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default VerifyConsultation;

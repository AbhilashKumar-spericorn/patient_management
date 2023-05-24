import React, { useState } from 'react';
import Web3 from 'web3';
import certificateVerificationFunction from '../../blockchain/vaccinationCertificateVerify';

const VerifyVaccine = () => {
  const [vaccineCert, setVaccineCert] = useState('');
  const [result, setCode] = useState({});
  console.log(result);

  console.log(vaccineCert);
  const handleVaccinationChange = (e) => {
    setVaccineCert(e.target.value);
  };

  const verifyVaccination = async (e) => {
    e.preventDefault();
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();

    const data = await certificateVerificationFunction({
      web3,
      certificateNumber: vaccineCert,
    });
    const obj = decodedCertificateData(data);
    console.log(obj);
    setCode(obj);
  };

  const decodedCertificateData = (data) => {
    const startTimestamp = data.issuedDateTime; // Example start timestamp
    const endTimestamp = data.vaccineTakenDatetime;
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
      vaccineName: Web3.utils.hexToUtf8(data.vaccineName),
      vaccineTakenDatetime: endHours + ':00' + endAMPM,
      disease: Web3.utils.hexToUtf8(data.disease),
      antigen: Web3.utils.hexToUtf8(data.antigen),
      issuerName: Web3.utils.hexToUtf8(data.issuerName) + 'Hospitals',
      issuerId: Web3.utils.hexToUtf8(data.issuerId),
      issuedDateTime: startHours + ':00' + startAMPM,
    };
    return returnedCertificates;
  };

  return (
    <div className="container mt-4 mb-4">
      <h3 className="text-center home-text">Verify Vaccine Certificate</h3>

      <form class="form-inline" onSubmit={verifyVaccination}>
        <div className="form-group ml-5 d-flex justify-content-center">
          <label class="sr-only" for="inputName">
            vaccine
          </label>{' '}
          <input
            type="text"
            class="form-control w-50"
            id="vaccine"
            placeholder="vaccine"
            onChange={handleVaccinationChange}
            value={vaccineCert}
            required
          />
          <button className="btn btn-dark mx-4">Verify</button>
        </div>
        {result ? (
          <div className="container mt-4 d-flex justify-content-center">
          <div class="card" style={{ width: '18rem' }}>
            <div class="card-body">
              <h5 class="card-title">Patient Name:{result?.patientName}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Vaccine Name:{result?.vaccineName}
                <br />
                Time:{result?.vaccineTakenDatetime}
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

export default VerifyVaccine;

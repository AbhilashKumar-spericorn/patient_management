import React from 'react';

const VerifyConsultation = () => {
  return (
    <div className="container mt-5 mb-4">
      <h3 className="text-center"style={{fontSize:'30px',fontWeight:'600'}}>Verify Consultation Certificate</h3>

      <form class="form-inline" action="" method="post">
        <div className="form-group ml-5 d-flex justify-content-center">
          <label class="sr-only" for="inputName">
            consultation
          </label>{' '}
          <input
            type="text"
            class="form-control w-50"
            id="consultation"
            placeholder="consultation"
            required
          />
          <button className="btn btn-danger mx-4">Verify</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyConsultation;

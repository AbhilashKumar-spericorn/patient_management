import React from 'react';

const VerifyVaccine = () => {
  return (
    <div className="container mt-4 mb-4">
      <h3 className="text-center home-text">Verify Vaccine Certificate</h3>

      <form class="form-inline" action="" method="post">
        <div className="form-group ml-5 d-flex justify-content-center">
          <label class="sr-only" for="inputName">
            vaccine
          </label>{' '}
          <input
            type="text"
            class="form-control w-50"
            id="vaccine"
            placeholder="vaccine"
            required
          />
          <button className="btn btn-dark mx-4">Verify</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyVaccine;

import React from 'react';

const Testimonial = () => {
  return (
    <section className='mt-5 mb-3'>
      <div className="row d-flex justify-content-center mx-3">
        <div className="col-md-10 col-xl-8 text-center">
          <h3 className="mb-4 home-text">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
        </div>
      </div>

      <div className="row text-center d-flex align-items-stretch mx-3">
        <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: '#9d789b' }}></div>
            <div className="avatar mx-auto bg-white">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet
                eos adipisci, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: '#7a81a8' }}></div>
            <div className="avatar mx-auto bg-white">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Lisa Cudrow</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Neque cupiditate assumenda
                in maiores repudi mollitia architecto.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: '#6d5b98' }}></div>
            <div className="avatar mx-auto bg-white">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                className="rounded-circle img-fluid"
              />
            </div>
            <div className="card-body">
              <h4 className="mb-4">John Smith</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Delectus impedit saepe
                officiis ab aliquam repellat rem unde ducimus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

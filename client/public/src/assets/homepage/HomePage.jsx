import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Testimonial from './Testimonial';
import Services from './Services';
import ContactUs from './ContactUs';
import Carousel from 'react-bootstrap/Carousel';
const HomePage = () => {
  return (
    <div>
      <Header />

      <Carousel className="crd">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://softwareauggest-blogimages.s3.ca-central-1.amazonaws.com/blog/wp-content/uploads/2021/05/10192350/Top-8-Benefits-of-Having-A-Smart-Hospital-Management-System.png"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
         src =  "https://5.imimg.com/data5/ANDROID/Default/2022/8/KD/PG/OM/138582968/product-jpeg-1000x1000.jpg"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.qminder.com/resources/img/blog/importance-patient-satisfaction.png"
            alt="Third slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Testimonial />
      <Services/>
      <ContactUs/>
      <Footer />
    </div>
  );
};

export default HomePage;

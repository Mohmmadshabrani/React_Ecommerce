import React from 'react';
import './AboutUs.css'; // Import your CSS file

const AboutUs = () => {
  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <img className="mainImg" src="https://i.pinimg.com/564x/25/20/a1/2520a1f175ac99087df0addfb82855d2.jpg" alt="Main Image" />
        <div className="allText aboveText">
          <p className="text-blk headingText">
          KEBO          </p>
          <p className="text-blk subHeadingText">
          Welcome to our computer hardware selling website!
         </p>
          <p className="text-blk description">
          At KEBO we are passionate about providing you with top-quality computer hardware solutions that meet your every need. With a commitment to excellence, we offer a wide range of products, from cutting-edge processors and graphics cards to reliable storage solutions and peripherals.</p>
          <button className="explore">
            Explore
          </button>
        </div>
      </div>
      <div className="responsive-container-block Container bottomContainer">
        <img className="mainImg" src="https://i.pinimg.com/564x/80/68/f3/8068f373c8677bd1916c4c234f5222cb.jpg" alt="Main Image" />
        <div className="allText bottomText">
          <p className="text-blk headingText">
            Our mission
          </p>
          <p className="text-blk subHeadingText">
          Welcome to our computer hardware selling website!
          </p>
          <p className="text-blk description">
          Our mission is to make your technology journey smoother, whether you're a seasoned tech enthusiast or just starting to explore the world of computing. We take pride in delivering not only exceptional products but also expert guidance and support to help you make informed decisions. Thank you for choosing us as your trusted source for all things computer hardware.           </p>
          <button className="explore">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
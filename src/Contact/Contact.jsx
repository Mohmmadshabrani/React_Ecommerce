import React from 'react';
import './contactUs.css';
import { FaEnvelope, FaPhone } from 'react-icons/fa'; 
import ww_jpg from '../image/ww.jpg'; 

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-container">
      {/* Contact content */}
      <div className="contact-content">
        <h1>Contact Us</h1>
        <br/>
        <br/>

        <div className="contact-details">
          <h4>If you have any questions, inquiries, or feedback, please feel free to get in touch with us using the following methods:</h4>
          <br/>
          <br/>

          <ul className="contact-info" >
            <li className='list'>
              <FaEnvelope className="contact-icon" />  
                      KEBO@example.com
            </li>
            <br/>
            <li className='list'>
              <FaPhone className="contact-icon" />
                      +962 79 999 9999
            </li>
          </ul>
        </div>
        <br/>
        

        <div className="contact-form">
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Background image */}
      <div className="background-image">
        <img src={ww_jpg} alt="Contact Us" />
      </div>
    </div>
  );
};

export default ContactUs;
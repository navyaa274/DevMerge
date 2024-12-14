import React from "react";
import "../../styles/contactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      <p>
      Thank you for visiting our contact page! We are a dynamic collaborative coding platform designed to empower developers around the world. Whether you're working on a project or seeking innovative solutions, our platform offers seamless real-time coding and connection. Join us and experience the future of collaborative coding. If you have any questions or need support, please reach out—we're here to help!🚀
      <center>
        
      Feel free to adjust or expand this as needed! Let me know if there's anything more you'd like to add.
      
      </center>
      

      </p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="fa fa-map-mazrker"></i>
            <p>4th floor, room no. 421 - Turing Block, Chitkara University, Rajpura, Distt. Patiala, Punjab</p>
          </div>
          <div className="info-item">
            <i className="fa fa-phone"></i>
            <p>+91-8988876891 </p>
          </div>
          <div className="info-item">
            <i className="fa fa-envelope"></i>
            <p>devmerge@gmail.com</p>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Type your Message..." required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
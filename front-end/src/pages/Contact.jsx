import { Link } from 'react-router-dom'


export default function Contact() {
  return (
    <div className="home-page contact-page">
      <section className="contact">
        <div className="overlay-text">
          <h1>Contact Us</h1>
          <p style={{ marginTop: '20px' }}>
            <Link to="/" className="video-link">Home</Link>
            <i className="fa-solid fa-greater-than" style={{ marginLeft: '16px', marginRight: '16px', fontSize: '12px' }}></i> Contact us
          </p>
        </div>
      </section>
      <br /><br />

      <section className="contactus">
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.13778301204!2d77.57684667430381!3d13.026896613665095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c69f8039db%3A0x29881944fc0948bc!2sASAR%20IT%20TECHNOLOGIES%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1789466409237!5m2!1sen!2sin" width="400" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>

        <div className="contact_rightside">
          <h2>Our Address</h2>
          <p>Visit our workshop for a free inspection and upfront quote. We are open Monday to Saturday, 7:00AM to 6:00PM — walk-ins welcome, appointments get priority.</p><br />
          <h3><i className="fa-solid fa-location-dot contact-icon"></i>Address</h3>
          <p>54B, Bangalore, 54100</p><br />
          <h3><i className="fa-regular fa-envelope contact-icon"></i>Email</h3>
          <p>contact@autorex.com</p><br />
          <h3><i className="fa-solid fa-phone contact-icon"></i>Phone</h3>
          <p>+918247382834</p>
        </div>
      </section>

      <br /><br />

      <section className="appo-section">
        <div className="appointment">
          <div>
            <h2>Schedule your appointment today</h2>
            <p>Call us or book online — same-day slots available for most services.</p>
          </div>
          <div><h2>1880.456.7890</h2></div>
          <div>
            <a href="tel:18804567890" className="appo-btn">Call Now</a>
          </div>
        </div>
      </section>
    </div>
  )
}

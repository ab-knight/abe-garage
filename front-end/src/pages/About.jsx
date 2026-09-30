import { Link } from 'react-router-dom'


export default function About() {
  return (
    <div className="home-page about-page">
      <section className="Aboutus">
        <div className="overlay-text">
          <h1>About Us</h1>
          <p style={{ marginTop: '20px' }}>
            <Link to="/" className="video-link">Home</Link>
            <i className="fa-solid fa-greater-than" style={{ marginLeft: '16px', marginRight: '16px', fontSize: '12px' }}></i> About us
          </p>
        </div>
      </section>

      <section className="aboutsection">
        <div className="textabout">
          <p>Welcome to our workshop</p>
          <br />
          <h1>We are highly skilled mechanics for your car repair</h1>
          <span style={{ color: 'rgb(255, 132, 0)' }}>———</span>
          <p className="gray-text">
            Since 1992, our workshop has grown from a two-man garage into a
            team of certified mechanics, diagnosticians, and paint specialists.
            We invest in dealer-level diagnostic equipment and continuous
            training, so whether it is a routine service or a complex engine
            rebuild, your car is in hands that have seen it all before. <br /><br />

            Honest advice is our policy: if a part still has life in it, we
            will tell you. If it needs replacing, we will show you why —
            before any work begins.
          </p>
        </div>

        <div className="aboutimg"><img src="/assets/aboutus2.png" alt="" /></div>
      </section>

      <section className="midsection">
        <div className="images-container">
          <div><img src="/assets/image1.png" alt="" /></div>
          <div><img src="/assets/image2.png" alt="" /></div>
        </div>
        <div className="text-container">
          <p>Welcome to our workshop</p>
          <br />
          <h1>We have 24 years experience</h1>
          <span style={{ color: 'rgb(255, 132, 0)' }}>———</span>
          <p className="gray-text">
            Three decades of hands-on work means faster, more accurate
            diagnoses — our senior mechanics recognize most faults by sound
            and feel before the computer confirms it. That experience saves
            you time and money: no guesswork, no unnecessary part swaps,
            just the right fix the first time. <br /><br />

            Thousands of drivers across the city trust us with their cars
            every year, and most of our new customers arrive on a friend's
            recommendation.
          </p>
        </div>
      </section>

      <section className="why-services">
        {/* LEFT SIDE */}
        <div className="why-choose">
          <h2>Why Choose Us <span style={{ color: 'rgb(255, 132, 0)' }}>__</span></h2>

          <p>
            Drivers choose us for simple reasons: certified mechanics, honest
            pricing, and work backed by a 6-month warranty. Here is what
            sets the workshop apart.
          </p>

          <div className="feature">
            <div className="icon"><i className="fa-solid fa-user-gear"></i></div>
            <h3>Certified Expert Mechanics</h3>
          </div>

          <div className="feature">
            <div className="icon"><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <h3>Fast And Quality Service</h3>
          </div>

          <div className="feature">
            <div className="icon"><i className="fa-solid fa-gas-pump"></i></div>
            <h3>Best Prices in Town</h3>
          </div>

          <div className="feature">
            <div className="icon"><i className="fa-solid fa-trophy"></i></div>
            <h3>Awarded Workshop</h3>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="additional-services">
          <h2>Additional Services <span style={{ color: 'rgb(255, 132, 0)' }}>__</span></h2>

          <div className="services-content">
            <img src="/assets/image4.png" alt="Car" />

            <div className="service-list">
              <div className="service">General Auto Repair</div>
              <div className="service">Transmission Repair</div>
              <div className="service">Tire Repair and Replacement</div>
              <div className="service">State Emissions Inspection</div>
              <div className="service">Brake Job / Brake Services</div>
              <div className="service">Electrical Diagnostics</div>
              <div className="service">Fuel System Repairs</div>
              <div className="service">Starting and Charging Repair</div>
              <div className="service">Steering and Suspension</div>
              <div className="service">Emission Repair Facility</div>
              <div className="service">Wheel Alignment</div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-container">
        <div className="overlay-text">
          <p className="first-overlay">Working since 1992 <span style={{ color: 'rgb(255, 132, 0)' }}>___</span></p>
          <h1>We are leader in car mechanical work</h1>
          <p>
            <a
              href="https://www.youtube.com/watch?v=PUkAIAIzA0I"
              className="video-link"
              target="_blank"
              rel="noreferrer"
            ><i className="fa-solid fa-circle-play"></i>Watch Our Story</a>
          </p>
        </div>
      </section>

      <section className="appo-section">
        <div className="appointment">
          <div>
            <h2>Schedule your appointment today</h2>
            <p>Call us or book online — same-day slots available for most services.</p>
          </div>
          <div><h2>1880.456.7890</h2></div>
          <div>
            <Link to="/contact" className="appo-btn">Contact Us</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

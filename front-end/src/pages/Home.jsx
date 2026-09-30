import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page">
      <section className="banner-container">
        <div className="overlay-text">
          <p className="first-overlay">
            Working since 1992{" "}
            <span style={{ color: "rgb(255, 132, 0)" }}>———</span>
          </p>

          <h1>
            Tune-up your car <br />
            to next level
          </h1>
          <p>
            <a
              href="https://www.youtube.com/watch?v=PUkAIAIzA0I"
              className="video-link"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-circle-play"></i>Watch Our Story
            </a>
          </p>
        </div>
      </section>

      <hr />
      <section className="midsection">
        <div className="images-container">
          <div>
            <img src="/assets/image1.png" alt="" />
          </div>
          <div>
            <img src="/assets/image2.png" alt="" />
          </div>
        </div>
        <div className="text-container">
          <p>Welcome to our workshop</p>
          <br />
          <h1>We have 24 years experience</h1>
          <span style={{ color: "rgb(255, 132, 0)" }}>———</span>
          <p className="gray-text">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a normal that has
            evolved from generation X is on the runway heading towards a
            streamlined cloud solution. User generated content in real-time will
            have multiple touchpoints of offshoring. <br />
            <br />
            Capitalize on low hanging fruit to identify a ballpark value added
            activity to beta test. Override the digital divide with additional
            clickthroughs from DevOps. Nanotechnology immersion along the
            information highway will close the loop on focusing.
          </p>
        </div>
      </section>

      <section className="service-background">
        <div className="service-container">
          <h1>
            Our Service <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
          </h1>
          <p className="gray-text">
            From routine maintenance to major repairs, our certified
            mechanics handle it all — browse our most requested services
            below, or visit the Services page for the full catalog.
          </p>

          <div className="first-card">
            <div>
              <p>Service and repairs</p>
              <h3>Performance upgrade</h3>
              <Link to="/service" className="card-read" >Read More</Link>
            </div>
            <div>
              <p>Service and repairs</p>
              <h3>Transmission services</h3>
              <Link to="/service" className="card-read">Read More</Link>
            </div>
            <div>
              <p>Service and repairs</p>
              <h3>Brake repair and services</h3>
              <Link to="/service" className="card-read">Read More</Link>
            </div>
          </div>

          <div className="second-card">
            <div>
              <p>Service and repairs</p>
              <h3>Engine service and repair</h3>
              <Link to="/service" className="card-read">Read More</Link>
            </div>
            <div>
              <p>Service and repairs</p>
              <h3>Tyre & Wheels</h3>
              <Link to="/service" className="card-read">Read More</Link>
            </div>
            <div>
              <p>Service and repairs</p>
              <h3>Denting and Painting</h3>
              <Link to="/service" className="card-read">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="Quality-section">
        <div className="Quality">
          <h1>Quality service and customer satisfaction</h1>
          <p>
            Every car that leaves our workshop passes a 40-point quality
            inspection by a certified mechanic. We use genuine parts, give
            upfront pricing before any work begins, and back every repair
            with a 6-month service warranty — that is why most of our
            customers come back, and bring their friends.
          </p>
        </div>
      </section>

      <section className="why-services">
        {/* LEFT SIDE */}
        <div className="why-choose">
          <h2>
            Why Choose Us <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
          </h2>

          <p className="gray-text">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation heading towards.
          </p>

          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-user-gear"></i>
            </div>
            <h3>Certified Expert Mechanics</h3>
          </div>

          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h3>Fast And Quality Service</h3>
          </div>

          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-gas-pump"></i>
            </div>
            <h3>Best Prices in Town</h3>
          </div>

          <div className="feature">
            <div className="icon">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <h3>Awarded Workshop</h3>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="additional-services">
          <h2>
            Additional Services{" "}
            <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
          </h2>

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
              <div className="service">Computer diagnostic tasting</div>
              <div className="service">Wheel Alignment</div>
              <div className="service">Any additional services</div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-container">
        <div className="overlay-text">
          <p className="first-overlay">
            Working since 1992{" "}
            <span style={{ color: "rgb(255, 132, 0)" }}>___</span>
          </p>
          <h1>We are leader in car mechanical work</h1>
          <p>
            <a
              href="https://www.youtube.com/watch?v=PUkAIAIzA0I"
              className="video-link"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-circle-play"></i>Watch Our Story
            </a>
          </p>
        </div>
      </section>

      <section className="appo-section">
        <div className="appointment">
          <div>
            <h2>Schedule your appointment today</h2>
            <p>Call us or book online — same-day slots available for most services.</p>
          </div>
          <div>
            <h2>1880.456.7890</h2>
          </div>
          <div>
            <Link to="/contact" className="appo-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

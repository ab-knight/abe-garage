import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServices } from '../services/service.service'

// Shown until the admin adds real services in /admin/services
const FALLBACK_SERVICES = [
  { service_name: 'Performance upgrade' },
  { service_name: 'Transmission services' },
  { service_name: 'Brake repair and services' },
  { service_name: 'Engine service and repair' },
  { service_name: 'Tyre & Wheels' },
  { service_name: 'Denting and Painting' },
]

function serviceIcon(name = '') {
  const n = name.toLowerCase()
  if (n.includes('performance')) return 'fa-solid fa-gauge-high'
  if (n.includes('transmission')) return 'fa-solid fa-gears'
  if (n.includes('brake')) return 'fa-solid fa-compact-disc'
  if (n.includes('engine')) return 'fa-solid fa-wrench'
  if (n.includes('tyre') || n.includes('tire') || n.includes('wheel')) return 'fa-solid fa-life-ring'
  if (n.includes('dent') || n.includes('paint')) return 'fa-solid fa-paint-roller'
  return 'fa-solid fa-screwdriver-wrench'
}

function ServiceCard({ service }) {
  return (
    <div>
      <small>SERVICE AND REPAIRS</small>
      <h3>{service.service_name}</h3>
      {service.service_description && (
        <p className="gray-text">{service.service_description}</p>
      )}
      <div className="card-foot">
        <Link to="/contact" className="card-read">READ MORE +</Link>
        <i className={serviceIcon(service.service_name)}></i>
      </div>
    </div>
  )
}

export default function Service() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data.services?.length > 0) setServices(data.services)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="home-page service-page">
      <section className="Services">
        <div className="overlay-text">
          <h1>Services</h1>
          <p style={{ marginTop: "20px" }}>
            <Link to="/" className="video-link">
              Home
            </Link>
            <i
              className="fa-solid fa-greater-than"
              style={{
                marginLeft: "16px",
                marginRight: "16px",
                fontSize: "12px",
              }}
            ></i>{" "}
            Service
          </p>
        </div>
      </section>
      <br />
      <br />

      <section className="service-background">
        <div className="service-container">
          <h1>
            Our Service <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
          </h1>
          <p className="gray-text">
            From routine maintenance to major repairs, our certified mechanics
            handle it all — browse our most requested services below, or visit
            the Services page for the full catalog.
          </p>

          <div className="first-card">
            {(services.length > 0 ? services.slice(0, 3) : FALLBACK_SERVICES.slice(0, 3)).map((service) => (
              <ServiceCard key={service.service_id || service.service_name} service={service} />
            ))}
          </div>

          <div className="second-card">
            {(services.length > 0 ? services.slice(3, 6) : FALLBACK_SERVICES.slice(3, 6)).map((service) => (
              <ServiceCard key={service.service_id || service.service_name} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="Quality-section">
        <div className="Quality">
          <h1>Quality service and customer satisfaction</h1>
          <p>
            Every car that leaves our workshop passes a 40-point quality
            inspection by a certified mechanic. We use genuine parts, give
            upfront pricing before any work begins, and back every repair with a
            6-month service warranty — that is why most of our customers come
            back, and bring their friends.
          </p>
        </div>
      </section>

      <section className="why-services">
        {/* LEFT SIDE */}
        <div className="why-choose">
          <h2>
            Why Choose Us <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
          </h2>

          <p>
            Drivers choose us for simple reasons: certified mechanics, honest
            pricing, and work backed by a 6-month warranty. Here is what sets
            the workshop apart.
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
              <div className="service">Wheel Alignment</div>
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
            <p>
              Call us or book online — same-day slots available for most
              services.
            </p>
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

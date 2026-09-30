export default function Footer() {
  return (
    <footer>
      <section className="footer-section">
        <div className="black-footer">
          <div>
            <i className="fa-solid fa-location-dot footer-icon"></i>
            54B,bangalore,this city,
            <br />
            54100, ia 23939
          </div>
          <div>
            <i className="fa-regular fa-envelope footer-icon"></i>
            Email us: <br />
            contact@autorex.com
          </div>
          <div>
            <i className="fa-solid fa-phone footer-icon"></i>
            call us on: <br />
            +918247382834
          </div>
        </div>
        <div className="lower-side">
          <div className="footer-text">
            Abe Garage has served drivers since 1992 with honest pricing,
            certified mechanics, and genuine parts. From routine service to
            full engine repair, we treat every car like our own.
          </div>
          <div>
            <h2>Useful Links</h2>
            <div>Home</div>
            <br />
            <div>About Us</div>
            <br />
            <div>Appointment</div>
            <br />
            <div>Testimonials</div>
            <br />
            <div>Contact Us</div>
          </div>
          <div>
            <h2>Our Services</h2>
            <div>Performance upgrade</div>
            <br />
            <div>Transmission service</div>
            <br />
            <div>Break Repair & service</div>
            <br />
            <div>Engine Services & Repair</div>
            <br />
            <div>Tyre & Wheels</div>
          </div>
          <div>
            <h2>Newsletter</h2>
            <div>Get latest updates and offers.</div>
            <div className="social-icons">
              <a href="#" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" title="Twitter"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" title="Google Plus"><i className="fa-brands fa-google-plus-g"></i></a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
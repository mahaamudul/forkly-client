import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-neutral text-neutral-content">
      <div className="content-shell py-12 md:py-16">
        <div className="footer grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-12">
          <aside>
            <h2 className="text-3xl font-bold">Forkly</h2>
            <p className="max-w-sm">
              Fresh plates, warm service, and online ordering built for busy
              guests who still want a proper meal.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Explore</h6>
            <Link to="/menu" className="link link-hover">Menu</Link>
            <Link to="/order/salad" className="link link-hover">Order Food</Link>
            <Link to="/contact" className="link link-hover">Contact</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Open Hours</h6>
            <p>Daily: 10:00 AM - 11:00 PM</p>
            <p>Kitchen closes at 10:30 PM</p>
            <p>Call: +1 555 013 4567</p>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-3 justify-start">
              <a className="btn btn-ghost btn-circle" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a className="btn btn-ghost btn-circle" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a className="btn btn-ghost btn-circle" aria-label="Facebook">
                <FaFacebookF />
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div className="bg-base-300 text-base-content">
        <aside className="content-shell py-4 text-center">
          <p>Copyright 2026 - All rights reserved by Forkly.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

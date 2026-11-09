import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeartbeat,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto">
        <div className="footer p-10 text-base-content grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <aside className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-primary mb-2"
            >
              <FaHeartbeat className="text-3xl" />
              Mediflow
            </Link>
            <p className="opacity-80 max-w-xs">
              Your trusted online pharmacy. Delivering genuine medicines safely
              and swiftly to your doorstep across Bangladesh.
            </p>
          </aside>

          <nav>
            <h6 className="footer-title text-primary">Services</h6>
            <Link href="/browse-medicines" className="link link-hover">
              Browse Medicines
            </Link>
            <Link href="/my-cart" className="link link-hover">
              My Cart
            </Link>
            <Link href="/track-order" className="link link-hover">
              Track Order
            </Link>
            <Link href="/consult-doctor" className="link link-hover">
              Doctor Consultation
            </Link>
          </nav>

          <nav>
            <h6 className="footer-title text-primary">Company</h6>
            <Link href="/about-us" className="link link-hover">
              About Us
            </Link>
            <Link href="/contact" className="link link-hover">
              Contact Support
            </Link>
            <Link href="/careers" className="link link-hover">
              Careers
            </Link>
            <Link href="/faq" className="link link-hover">
              FAQ
            </Link>
          </nav>

          <nav>
            <h6 className="footer-title text-primary">Legal</h6>
            <Link href="/terms" className="link link-hover">
              Terms of Service
            </Link>
            <Link href="/privacy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="link link-hover">
              Refund Policy
            </Link>
          </nav>
        </div>

        <div className="footer footer-center p-6 border-t border-base-300 text-base-content">
          <aside className="flex flex-col md:flex-row items-center justify-between w-full">
            <p className="text-sm opacity-80">
              © Mediflow. All rights reserved.
            </p>

            <nav className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </Link>
              <Link
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </Link>
              <Link
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </Link>
            </nav>
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <img
              src="../../public/images/logo/logo2.png"
              alt="Logo"
              className="h-20 mx-auto md:mx-0"
            />
            <p className="mt-4 max-w-md text-sm text-gray-300">
              At SelfySnap, we believe beauty is more than skin deep — it’s a celebration of confidence, care, and self-expression. Founded with a passion for clean, effective, and inclusive beauty, SelfySnap blends science and nature to create skincare and cosmetic products that work for every skin type and tone.
            </p>
            <ul className="flex gap-4 mt-4 justify-center md:justify-start text-white text-xl">
              <li><Link className="text-white" to="https://facebook.com"><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link className="text-white" to="#"><i className="fab fa-twitter"></i></Link></li>
              <li><Link className="text-white" to="#"><i className="fab fa-instagram"></i></Link></li>
              <li><Link className="text-white" to="#"><i className="fab fa-linkedin"></i></Link></li>
            </ul>
          </div>

          <div className="w-full max-w-xl text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <img
                src="/images/envelope-outline.svg"
                alt="Newsletter"
                className="h-6"
              />
              Subscribe to Newsletter
            </h3>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-300 mb-12">
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link className="text-white" to="/about">About Us</Link></li>
              <li><Link className="text-white" to="/product">Products</Link></li>
              <li><Link className="text-white" to="/blog">Blog</Link></li>
              <li><Link className="text-white" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2">
              <li><Link className="text-white" to="#">24/7 Support</Link></li>
              <li><Link className="text-white" to="#">Live Chat</Link></li>
              <li><Link className="text-white" to="#">Our Products</Link></li>
              <li><Link className="text-white" to="#">Mobile: +91 9992088843</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link className="text-white" to="#">Terms & Conditions</Link></li>
              <li><Link className="text-white" to="#">Privacy Policy</Link></li>
              <li><Link className="text-white" to="#">Our Team</Link></li>
              <li><Link className="text-white" to="#">Email: support@selfysnap.com</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Orders</h4>
            <ul className="space-y-2">
              <li><Link className="text-white" to="#">My Orders</Link></li>
              <li><Link className="text-white" to="#">Return Policy</Link></li>
              <li><Link className="text-white" to="#">Shipping Info</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} SelfySnap. All rights reserved. | Designed by{" "}
            <a href="https://web4businesssolutions.com" className="!text-pink-500 hover:underline">Web4BusinessSolutions.com</a>
          </p>
          <div className="flex justify-center md:justify-end gap-6 mt-4 md:mt-0">
            <Link className="text-white" to="#">Terms</Link>
            <Link className="text-white" to="#">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

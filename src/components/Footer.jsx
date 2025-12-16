import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:bg-slate-900 text-slate-300 dark:text-slate-400 py-12 border-t border-white/10 dark:border-slate-700 relative z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-bold text-white dark:text-white tracking-tight">
              Chikitsaalye
            </span>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            Real-time healthcare access for every citizen. Connecting patients
            with doctors, hospitals, and labs across Bharat.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white dark:text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                Find Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/search?type=hospitals"
                className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                Hospitals
              </Link>
            </li>
            <li>
              <Link
                to="/search?type=labs"
                className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                Pathology Labs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                My Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Help */}
        <div>
          <h3 className="text-white dark:text-white font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Emergency Protocols
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Partner with Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="text-white dark:text-white font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-orange-500 dark:text-orange-400 mt-0.5 shrink-0" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-orange-500 dark:text-orange-400 shrink-0" />
              <span>+91 9999999999</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-orange-500 dark:text-orange-400 shrink-0" />
              <span>support@chikitsaalye.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-500">
        <p>© 2025 Chikitsaalye Health Services. All rights reserved.</p>
      </div>
    </footer>
  );
}

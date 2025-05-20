import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Footer = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are a company dedicated to providing excellent services and
              products to our customers. Our mission is to help students and companies
              connect and grow together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                <span className="text-sm text-gray-600">
                  ESI sba ,Sidi Bel Abess
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <a
                  href="mailto:info@example.com"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  info@example.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  0560620999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-gray-600 sm:flex-row sm:space-y-0">
            <p>© 2024 Your Company. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

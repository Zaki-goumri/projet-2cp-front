import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-gray-100 py-8 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">About Us</h3>
            <p className="text-sm">
              We are a company dedicated to providing excellent services and
              products to our customers.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>

            <ul className="text-sm">
              {links.map((link) => (
                <li key={link.href} className="mb-1">
                  <Link to={link.href} className="hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">123 Main St, Anytown, USA 12345</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { FaPaw, FaFacebook, FaInstagram, FaLine, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FaPaw className="text-3xl text-primary-400" />
              <span className="font-bold text-2xl">Maipaws</span>
            </Link>
            <p className="text-gray-400 mb-4">
              ร้านขายสินค้าสัตว์เลี้ยงครบวงจร อาหาร อุปกรณ์ ของเล่น 
              และทุกสิ่งที่สัตว์เลี้ยงของคุณต้องการ
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLine className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-primary-400" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-primary-400" />
                <span>contact@petshop.com</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-primary-400 mt-1" />
                <span>123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Pet Paradise Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

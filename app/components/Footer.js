import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-5">
      <div className="max-md:flex-col mx-auto text-center flex justify-around">
        <p className="mb-4">&copy; 2024 My Jarvo. All rights reserved.</p>
        <ul className="flex justify-center gap-6">
          <li><Link href="#" className="text-gray-400 text-sm">Privacy Policy</Link></li>
          <li><Link href="#" className="text-gray-400 text-sm">Terms of Service</Link></li>
          <li><Link href="/contact" className="text-gray-400 text-sm">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Instagram, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '@/lib/data-context';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { settings, isAdmin } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımda', href: '/hakkimda' },
    { name: 'Vizyonum', href: '/vizyonum' },
    { name: 'Hizmetler', href: '/#hizmetler', dropdown: true },
    { name: 'İletişim', href: '/#iletisim' },
  ];

  const services = [
    { name: 'Çocuk Danışmanlığı', href: '/#hizmetler' },
    { name: 'Ergen Danışmanlığı', href: '/#hizmetler' },
    { name: 'Yetişkin Danışmanlığı', href: '/#hizmetler' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold text-slate-800 tracking-tight">
              Psk. Dan. <span className="text-pistachio-500">Meleknur Budak</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <button
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    className="flex items-center text-slate-600 hover:text-pistachio-500 font-medium transition-colors"
                  >
                    {link.name} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                ) : (
                  <Link href={link.href} className="text-slate-600 hover:text-pistachio-500 font-medium transition-colors">
                    {link.name}
                  </Link>
                )}

                {link.dropdown && (
                  <div 
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-3 text-sm text-slate-600 hover:bg-pistachio-50 hover:text-pistachio-600 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a 
              href={`https://instagram.com/${settings?.instagram || 'psk.dan.meleknurbudak'}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-pistachio-50 text-pistachio-500 rounded-full hover:bg-pistachio-100 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2 bg-pistachio-600 text-white rounded-full hover:bg-pistachio-700 transition-colors shadow-md"
                title="Admin Paneli"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-beige-50 border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-pistachio-500 hover:bg-pistachio-50 rounded-lg"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-slate-500 hover:text-pistachio-500"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex justify-center">
                <a 
                  href={`https://instagram.com/${settings?.instagram || 'psk.dan.meleknurbudak'}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-pistachio-500 font-medium"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram&apos;da Takip Et</span>
                </a>
              </div>
              {isAdmin && (
                <div className="pt-4 flex justify-center border-t border-slate-100 mt-4">
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-pistachio-600 font-bold"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Admin Paneli</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

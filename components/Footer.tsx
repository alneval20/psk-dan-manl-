'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, Heart } from 'lucide-react';
import { useData } from '@/lib/data-context';

const Footer = () => {
  const { settings, t, language } = useData();

  return (
    <footer className="bg-beige-100 text-slate-600 py-16 border-t border-beige-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-2xl font-serif font-bold text-slate-900 mb-6">
              {t.nav.titlePrefix} <span className="text-pistachio-600">Meleknur Budak</span>
            </h4>
            <p className="text-slate-500 leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://instagram.com/${settings?.instagram || 'psk.dan.meleknurbudak'}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-beige-200 rounded-full flex items-center justify-center hover:bg-pistachio-500 hover:text-white transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${settings?.email || 'meleknurbudak4@gmail.com'}`}
                className="w-10 h-10 bg-white border border-beige-200 rounded-full flex items-center justify-center hover:bg-pistachio-500 hover:text-white transition-all shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.quickLinks}</h5>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-pistachio-600 transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/hakkimda" className="hover:text-pistachio-600 transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/#hizmetler" className="hover:text-pistachio-600 transition-colors">{t.nav.services}</Link></li>
              <li><Link href="/#iletisim" className="hover:text-pistachio-600 transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.workingHours}</h5>
            <ul className="space-y-4 text-slate-500">
              <li className="flex justify-between"><span>{t.footer.weekdays}</span> <span>09:00 - 18:00</span></li>
              <li className="flex justify-between"><span>{t.footer.saturday}</span> <span>10:00 - 15:00</span></li>
              <li className="flex justify-between text-slate-400"><span>{t.footer.sunday}</span> <span>{t.footer.closed}</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-beige-200 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Meleknur Budak. {t.footer.rightsReserved}</p>
          <p className="flex items-center gap-1">
            {t.footer.designedWith} <Heart className="w-4 h-4 text-pistachio-400 fill-pistachio-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

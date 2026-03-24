'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import EducationCertificates from '@/components/EducationCertificates';
import { DataProvider, useData } from '@/lib/data-context';
import { motion } from 'motion/react';

const HakkimdaContent = () => {
  const { t } = useData();

  return (
    <main className="min-h-screen bg-beige-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 bg-pistachio-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900"
          >
            {t.nav.about}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '80px' }}
            className="h-1 bg-pistachio-500 mx-auto mt-4 rounded-full"
          />
        </div>
      </div>

      <About />
      <EducationCertificates />
      
      {/* Additional Content for a full page experience */}
      <section className="py-20 bg-beige-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 text-center">{t.vision.badge}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-beige-200">
              <h3 className="text-xl font-bold text-pistachio-600 mb-4">{t.vision.empathyTitle}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t.vision.empathyDesc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-beige-200">
              <h3 className="text-xl font-bold text-pistachio-600 mb-4">{t.vision.scientificTitle}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t.vision.scientificDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default function HakkimdaPage() {
  return (
    <DataProvider>
      <HakkimdaContent />
    </DataProvider>
  );
}

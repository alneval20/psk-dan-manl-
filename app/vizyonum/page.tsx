'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisionApproach from '@/components/VisionApproach';
import { DataProvider } from '@/lib/data-context';
import { motion } from 'motion/react';

export default function VizyonumPage() {
  return (
    <DataProvider>
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
              Vizyonum & Yaklaşımım
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '80px' }}
              className="h-1 bg-pistachio-500 mx-auto mt-4 rounded-full"
            />
          </div>
        </div>

        <VisionApproach />
        
        <Footer />
      </main>
    </DataProvider>
  );
}

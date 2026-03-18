'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useData } from '@/lib/data-context';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { settings } = useData();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-beige-50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-pistachio-100/30 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pistachio-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-pistachio-700 uppercase bg-pistachio-200/50 rounded-full"
            >
              🎓 GAU | Psikolojik Danışman
            </motion.span>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight mb-6"
            >
              {settings?.heroTitle || "Ruh Sağlığınız İçin Güvenli Bir Alan"}
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-light"
            >
              {settings?.heroSubtitle || "Bilimsel temelli psikolojik yöntemler ve danışan odaklı yaklaşımımızla, ruh sağlığınızı destekliyoruz. Güvenli, empatik ve profesyonel danışmanlık süreçlerimizle kendinizi keşfetme ve iyileşme yolculuğunuzda yanınızdayız."}
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-pistachio-400 rounded-2xl hover:bg-pistachio-500 transition-all shadow-lg shadow-pistachio-200/50"
              >
                Randevu Al <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#hizmetler"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-pistachio-700 bg-white border-2 border-pistachio-200 rounded-2xl hover:bg-pistachio-50 transition-all"
              >
                Hizmetlerimiz
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src={settings?.aboutImage || "https://picsum.photos/seed/psychology/800/1000"}
                alt="Meleknur Budak"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            {/* Decorative Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-beige-200 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pistachio-100 rounded-full flex items-center justify-center text-pistachio-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Güvenli Alan</p>
                  <p className="text-xs text-slate-500">Gizlilik ve Empati</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

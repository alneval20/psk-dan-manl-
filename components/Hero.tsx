'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useData } from '@/lib/data-context';
import { ArrowRight } from 'lucide-react';
import Danisan from '../public/danisan.jpeg';

const Hero = () => {
  const { settings, t, language } = useData();

  const heroTitle = language === 'en' && settings?.heroTitle_en ? settings.heroTitle_en : (settings?.heroTitle || t.hero.floatingCardTitle);
  const heroSubtitle = language === 'en' && settings?.heroSubtitle_en ? settings.heroSubtitle_en : (settings?.heroSubtitle || t.hero.floatingCardSubtitle);

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
              {t.hero.badge}
            </motion.span>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight mb-6"
            >
              {heroTitle}
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-light"
            >
              {heroSubtitle}
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
                {t.hero.ctaAppointment} <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#hizmetler"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-pistachio-700 bg-white border-2 border-pistachio-200 rounded-2xl hover:bg-pistachio-50 transition-all"
              >
                {t.hero.ctaServices}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Animated Floating Shapes */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-pistachio-200/40 rounded-full blur-2xl z-0"
            />
            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl z-0"
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-[1.4/1]">
              <Image
                src={settings?.aboutImage && settings.aboutImage.includes('http') ? settings.aboutImage : Danisan}
                alt="Huzurlu Terapi Alanı"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              
              {/* Overlay Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
              />
            </div>

            {/* Decorative Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 hidden md:block z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pistachio-100 rounded-full flex items-center justify-center text-pistachio-600">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.hero.floatingCardTitle}</p>
                  <p className="text-xs text-slate-500">{t.hero.floatingCardSubtitle}</p>
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

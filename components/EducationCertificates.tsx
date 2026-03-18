'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, CheckCircle2, FileText, X, ZoomIn } from 'lucide-react';
import sertifika from '../sertik.jpeg';

const EducationCertificates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const educations = [
    {
      title: "Bilişsel Davranışçı Terapi Eğitimi",
      instructor: "Uzm. Psk. Gizem Çetin",
      description: "Düşünce ve davranış kalıplarının analizi ve dönüşümü üzerine kapsamlı uzmanlık eğitimi."
    },
    {
      title: "Temel Spor Psikolojisi",
      instructor: "Uzm. Spor Psk. Deren Yelmen",
      description: "Sporcuların performans gelişimi ve mental hazırlık süreçlerine yönelik psikolojik destek yöntemleri."
    },
    {
      title: "Mindfulness Temelli Terapi",
      instructor: "Uzm. Psk. Ezgi Vurkan",
      description: "Bilinçli farkındalık tekniklerinin terapi süreçlerine entegrasyonu ve stres yönetimi."
    },
    {
      title: "Temel Sanat Terapisi",
      instructor: "Uzm. Psk. Yasemin Erdemir",
      description: "Sanatın iyileştirici gücünü kullanarak duygusal dışavurum ve iyileşme teknikleri."
    },
    {
      title: "Staj Eğitimleri",
      instructor: "Rehber Klinik & TNC Group",
      description: "Klinik ortamda gözlem ve uygulama deneyimi kazandıran profesyonel staj programı."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-pistachio-100 text-pistachio-600 rounded-2xl mb-6"
          >
            <Award className="w-8 h-8" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Eğitim ve Sertifikalar</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mesleki gelişimimi sürekli kılmak adına aldığım temel eğitimler ve uzmanlık sertifikaları.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: List of Educations */}
          <div className="space-y-6">
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-beige-50 p-6 rounded-3xl border border-beige-200 hover:border-pistachio-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-pistachio-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-pistachio-600 transition-colors">
                      {edu.title}
                    </h3>
                    <p className="text-sm font-semibold text-pistachio-700 mb-2">
                      Eğitmen: {edu.instructor}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Certificate Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
              {/* Decorative Background */}
              <div className="absolute -inset-4 bg-pistachio-100/50 rounded-[2.5rem] blur-2xl group-hover:bg-pistachio-200/50 transition-colors -z-10" />
              
              <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="relative aspect-[1.414/1] bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                  {/* Certificate Mockup / Image Placeholder */}
                  <Image 
                    src={sertifika} 
                    alt="Temel Psikoloji Eğitimi Bitirme Sertifikası"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">Bitirme Sertifikası</p>
                    <h4 className="text-2xl font-serif font-bold mb-1">Temel Psikoloji Eğitimi</h4>
                    <p className="text-sm opacity-90">Meleknur Budak - TNC Group & Rehber Psikoloji</p>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-pistachio-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-pistachio-600 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                      Sertifikayı İncele
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-pistachio-50 rounded-2xl border border-pistachio-100">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-pistachio-600" />
                    <h4 className="font-bold text-slate-900">Sertifika Detayları</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pistachio-400 rounded-full" />
                      <strong>Kurum:</strong> TNC Group & Rehber Psikoloji
                    </li>
                    <li className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pistachio-400 rounded-full" />
                      <strong>Koordinatör:</strong> Uzm. Psk. Zekiye İrem Akıcı
                    </li>
                    <li className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pistachio-400 rounded-full" />
                      <strong>Yönetim Kurulu Başkanı:</strong> Doğukan Tunca
                    </li>
                  </ul>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-pistachio-500 text-white p-6 rounded-full shadow-lg border-4 border-white z-20"
              >
                <Award className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md text-slate-900 rounded-full hover:bg-pistachio-500 hover:text-white transition-all shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-2 sm:p-4">
                <div className="relative aspect-[1.414/1] w-full bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                  <Image 
                    src={sertifika} 
                    alt="Meleknur Budak Sertifika"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-beige-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Meleknur Budak</h3>
                  <p className="text-pistachio-600 font-medium">Temel Psikoloji Eğitimi Bitirme Sertifikası</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-beige-200 text-slate-700 rounded-xl hover:bg-pistachio-50 hover:border-pistachio-200 transition-all font-bold shadow-sm"
                >
                  <FileText className="w-5 h-5" />
                  Yazdır / İndir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationCertificates;

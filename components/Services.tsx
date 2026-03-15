'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '@/lib/data-context';
import * as LucideIcons from 'lucide-react';

const serviceDetails: Record<string, { details: string[], image: string }> = {
  'Çocuk Danışmanlığı': {
    details: [
      'Oyun Terapisi Yaklaşımı',
      'Duygusal Düzenleme Becerileri',
      'Davranışsal Sorunlarla Baş Etme',
      'Okul Uyum Süreçleri',
      'Kaygı ve Korku Yönetimi'
    ],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800'
  },
  'Ergen Danışmanlığı': {
    details: [
      'Kimlik ve Benlik Gelişimi',
      'Sınav Kaygısı ve Motivasyon',
      'Akran İlişkileri ve Sosyal Kaygı',
      'Aile İçi İletişim Çatışmaları',
      'Teknoloji ve Sosyal Medya Kullanımı'
    ],
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800'
  },
  'Yetişkin Danışmanlığı': {
    details: [
      'Bireysel Farkındalık Çalışmaları',
      'Depresyon ve Kaygı Bozuklukları',
      'İlişki ve Evlilik Sorunları',
      'Stres ve Öfke Yönetimi',
      'Kayıp ve Yas Süreçleri'
    ],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
  },
  'Online Bireysel Danışmanlık': {
    details: [
      'Güvenli ve Gizli Platform',
      'Mekan Bağımsız Terapi İmkanı',
      'Esnek Randevu Saatleri',
      'Yurt Dışı ve Şehir Dışı Erişim',
      'Görüntülü Görüşme Konforu'
    ],
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800'
  }
};

const Services = () => {
  const { services } = useData();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Heart;
    return <Icon className="w-8 h-8" />;
  };

  const currentDetail = selectedService ? serviceDetails[selectedService] : null;

  return (
    <section id="hizmetler" className="py-24 bg-beige-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-bold tracking-widest text-pistachio-600 uppercase mb-4"
          >
            Hizmetlerimiz
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-slate-900 mb-6"
          >
            Size Özel Profesyonel Destek
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Detaylı bilgi almak için hizmetlerimize tıklayabilirsiniz.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedService(service.title)}
              className={`cursor-pointer p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border group ${selectedService === service.title ? 'bg-pistachio-500 text-white border-pistachio-500' : 'bg-white text-slate-900 border-pistachio-100/50'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${selectedService === service.title ? 'bg-white/20 text-white' : 'bg-pistachio-50 text-pistachio-600 group-hover:bg-pistachio-500 group-hover:text-white'}`}>
                {getIcon(service.icon)}
              </div>
              <h4 className={`text-xl font-bold mb-4 ${selectedService === service.title ? 'text-white' : 'text-slate-900'}`}>{service.title}</h4>
              <p className={`leading-relaxed ${selectedService === service.title ? 'text-white/90' : 'text-slate-600'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedService && currentDetail && (
            <motion.div
              key={selectedService}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="mt-16 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-pistachio-100"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-12 lg:p-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-pistachio-100 text-pistachio-600 rounded-full flex items-center justify-center">
                      <LucideIcons.CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-slate-900">{selectedService} Detayları</h4>
                  </div>
                  <ul className="space-y-6">
                    {currentDetail.details.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 text-lg text-slate-700"
                      >
                        <div className="w-2 h-2 bg-pistachio-400 rounded-full" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4 mt-12">
                    <a 
                      href="#iletisim"
                      onClick={() => setSelectedService(null)}
                      className="px-8 py-3 bg-pistachio-500 text-white rounded-xl hover:bg-pistachio-600 transition-all font-bold shadow-lg shadow-pistachio-200/50 flex items-center gap-2 group"
                    >
                      Randevu Al 
                      <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all font-medium"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={currentDetail.image} 
                    alt={selectedService}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-pistachio-900/10" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Services Highlight */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {
              setSelectedService('Online Bireysel Danışmanlık');
              document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pistachio-100 flex items-center gap-8 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="hidden sm:flex w-20 h-20 bg-beige-200 text-pistachio-600 rounded-full items-center justify-center shrink-0">
              <LucideIcons.Globe className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">📍 Online Bireysel Danışmanlık</h4>
              <p className="text-slate-600">Mekan sınırı olmaksızın, güvenli dijital platformlar üzerinden profesyonel destek alabilirsiniz.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pistachio-100 flex items-center gap-8"
          >
            <div className="hidden sm:flex w-20 h-20 bg-pistachio-50 text-pistachio-600 rounded-full items-center justify-center shrink-0">
              <LucideIcons.Users className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">🎯 Çocuk – Ergen – Yetişkin</h4>
              <p className="text-slate-600">Her yaş grubuna özel, gelişimsel dönemlere uygun terapi yaklaşımları uyguluyoruz.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;

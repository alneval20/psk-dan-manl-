'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useData } from '@/lib/data-context';

const About = () => {
  const { settings } = useData();

  return (
    <section id="hakkimda" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-sm font-bold tracking-widest text-pistachio-600 uppercase mb-4">Hakkımda</h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 mb-8">
              Psk. Dan. <span className="text-pistachio-500">{settings?.consultantName || "Meleknur Budak"}</span>
            </h3>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                {settings?.aboutText || "Girne Amerikan Üniversitesi Psikolojik Danışmanlık ve Rehberlik mezunu Meleknur Budak olarak, çocuk, ergen ve yetişkinlere yönelik profesyonel destek sunuyorum."}
              </p>
              <p>
                Terapi sürecinde her bireyin benzersiz olduğunu ve her yolculuğun kendine has bir hızı olduğunu biliyorum. Amacım, size bu yolculukta eşlik etmek, kendinizi daha iyi anlamanıza ve yaşam kalitenizi artırmanıza yardımcı olmaktır.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-2xl border border-beige-200">
                  <p className="text-3xl font-bold text-pistachio-500 mb-1">GAU</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wide">Mezuniyet</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-beige-200">
                  <p className="text-3xl font-bold text-pistachio-500 mb-1">100+</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wide">Danışan</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square">
              <img
                src={settings?.aboutImage || "https://picsum.photos/seed/consultant/800/800"}
                alt="Meleknur Budak"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-pistachio-100 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-beige-200 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

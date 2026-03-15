'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Heart, Target, Sparkles, BookOpen, Users } from 'lucide-react';

const VisionApproach = () => {
  const principles = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gizlilik ve Etik",
      description: "Tüm görüşmelerimiz tam gizlilik prensibi ve mesleki etik kurallar çerçevesinde gerçekleştirilir."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Empatik Yaklaşım",
      description: "Yargılamadan, anlamaya odaklı ve şefkatli bir dinleme alanı sunuyorum."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Çözüm Odaklılık",
      description: "Sadece sorunlara değil, danışanın güçlü yönlerine ve potansiyeline odaklanıyoruz."
    }
  ];

  const methods = [
    {
      title: "Bilişsel Davranışçı Terapi (BDT)",
      text: "Düşünce, duygu ve davranış arasındaki ilişkiyi inceleyerek işlevsel olmayan kalıpları dönüştürmeyi hedefler."
    },
    {
      title: "Oyun Terapisi",
      text: "Çocukların dünyayı anlama ve duygularını ifade etme dili olan oyun aracılığıyla iyileşme sürecidir."
    },
    {
      title: "Hümanistik Yaklaşım",
      text: "Bireyin kendi potansiyelini gerçekleştirmesine ve öz-farkındalık kazanmasına rehberlik eder."
    }
  ];

  return (
    <section id="vizyon" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Vision & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-pistachio-600 uppercase mb-4">Vizyonum & Yaklaşımım</h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Ruh Sağlığına <span className="text-pistachio-500">Bütüncül</span> ve <span className="text-pistachio-500">İnsan Odaklı</span> Bir Bakış
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Psikolojik danışmanlık sürecini, sadece sorunların çözüldüğü bir alan değil, bireyin kendi iç dünyasını keşfettiği ve yaşam kalitesini artırdığı bir dönüşüm yolculuğu olarak görüyorum. Bilimsel temelli yöntemleri, her danışanın biricikliğine saygı duyarak harmanlıyorum.
            </p>

            <div className="space-y-8">
              {principles.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-5"
                >
                  <div className="w-12 h-12 bg-pistachio-50 text-pistachio-600 rounded-2xl flex items-center justify-center shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{p.title}</h4>
                    <p className="text-slate-600">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Methods & Visuals */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-beige-50 rounded-[3rem] p-10 lg:p-14 border border-pistachio-100 relative z-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-pistachio-500" />
                <h4 className="text-2xl font-serif font-bold text-slate-900">Kullandığım Yöntemler</h4>
              </div>
              
              <div className="space-y-8">
                {methods.map((m, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-pistachio-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-pistachio-500 rounded-full border-4 border-white" />
                    <h5 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h5>
                    <p className="text-slate-600 text-sm leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-pistachio-100 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-pistachio-100 flex items-center justify-center text-pistachio-600 text-xs font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-medium">Danışan odaklı, güvenli ve profesyonel süreç yönetimi.</p>
              </div>
            </motion.div>

            {/* Decorative Background Elements */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -top-10 -right-10 w-64 h-64 bg-pistachio-100/50 rounded-full blur-3xl -z-10" 
            />
            <motion.div 
              animate={{ 
                y: [0, 20, 0],
                x: [0, -20, 0]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-10 -left-10 w-72 h-72 bg-beige-200/50 rounded-full blur-3xl -z-10" 
            />
          </div>
        </div>

        {/* Bottom Highlight: Professional Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-pistachio-600 rounded-[3rem] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h4 className="text-3xl font-serif font-bold mb-6">Sürekli Gelişim ve Bilimsel Yaklaşım</h4>
            <p className="text-lg text-white/90 leading-relaxed">
              Psikoloji dinamik bir alan. Bu nedenle mesleki gelişimimi güncel eğitimler ve süpervizyon çalışmalarıyla sürekli destekliyor, danışanlarıma en güncel ve etkili yöntemlerle yardımcı olmayı taahhüt ediyorum.
            </p>
          </div>
          {/* Abstract background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionApproach;

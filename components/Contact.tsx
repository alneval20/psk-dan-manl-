'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useData } from '@/lib/data-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const { settings, t, language } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: t.common.defaultService,
    message: '',
    preferredDate: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const appointmentData = {
        ...formData,
        status: t.common.defaultStatus,
        language: language,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      
      // Optional: Notify admin via API route
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointmentData)
        });
      } catch (err) {
        console.error("Notification error:", err);
      }

      setStatus({ type: 'success', message: t.contact.successMessage });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: t.common.defaultService,
        message: '',
        preferredDate: ''
      });
    } catch (error) {
      console.error("Form error:", error);
      setStatus({ type: 'error', message: t.contact.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="py-24 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-pistachio-600 uppercase mb-4">{t.contact.badge}</h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              {t.contact.titleStart} <span className="text-pistachio-500">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
            </h3>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              {t.contact.description}
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  label: t.contact.emailLabel,
                  value: settings?.email || "meleknurbudak4@gmail.com",
                  href: `mailto:${settings?.email || 'meleknurbudak4@gmail.com'}`,
                  bg: "bg-pistachio-50"
                },
                {
                  icon: <Instagram className="w-6 h-6" />,
                  label: "Instagram",
                  value: `@${settings?.instagram || 'psk.dan.meleknurbudak'}`,
                  href: `https://instagram.com/${settings?.instagram || 'psk.dan.meleknurbudak'}`,
                  bg: "bg-beige-200"
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  label: t.contact.locationLabel,
                  value: t.contact.locationValue,
                  bg: "bg-beige-100"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className={`w-14 h-14 ${item.bg} text-pistachio-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-xl font-medium text-slate-900 hover:text-pistachio-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl font-medium text-slate-900">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] border border-beige-200 shadow-sm"
          >
            {status && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-pistachio-50 text-pistachio-700 border border-pistachio-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formName}</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all" 
                    placeholder="Meleknur Budak" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formEmail}</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all" 
                    placeholder="ornek@email.com" 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formPhone}</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all" 
                    placeholder="05xx xxx xx xx" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formService}</label>
                  <select 
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all"
                  >
                    <option value={language === 'tr' ? 'Yetişkin Danışmanlığı' : 'Adult Counseling'}>{language === 'tr' ? 'Yetişkin Danışmanlığı' : 'Adult Counseling'}</option>
                    <option value={language === 'tr' ? 'Çocuk Danışmanlığı' : 'Child Counseling'}>{language === 'tr' ? 'Çocuk Danışmanlığı' : 'Child Counseling'}</option>
                    <option value={language === 'tr' ? 'Ergen Danışmanlığı' : 'Adolescent Counseling'}>{language === 'tr' ? 'Ergen Danışmanlığı' : 'Adolescent Counseling'}</option>
                    <option value={language === 'tr' ? 'Diğer' : 'Other'}>{language === 'tr' ? 'Diğer' : 'Other'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formDate}</label>
                <input 
                  type="text" 
                  value={formData.preferredDate}
                  onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                  className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all" 
                  placeholder={t.contact.formDatePlaceholder} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.formMessage}</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-5 py-4 bg-beige-50/50 border border-beige-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pistachio-500/20 focus:border-pistachio-500 transition-all" 
                  placeholder={t.contact.formMessagePlaceholder}
                ></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full py-5 bg-pistachio-400 text-white font-bold rounded-xl hover:bg-pistachio-500 transition-all shadow-lg shadow-pistachio-200/50 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t.contact.submitButton}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

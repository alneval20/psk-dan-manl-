'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, onSnapshot, collection, query, orderBy, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { translations, Language, TranslationType } from './translations';

interface SiteSettings {
  heroTitle: string;
  heroTitle_en?: string;
  heroSubtitle: string;
  heroSubtitle_en?: string;
  aboutText: string;
  aboutText_en?: string;
  aboutImage: string;
  email: string;
  instagram: string;
  consultantName: string;
  consultantTitle: string;
  consultantTitle_en?: string;
}

interface Service {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  icon: string;
  order: number;
}

interface DataContextType {
  settings: SiteSettings | null;
  services: Service[];
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const DataContext = createContext<DataContextType>({
  settings: null,
  services: [],
  user: null,
  isAdmin: false,
  loading: true,
  language: 'tr',
  setLanguage: () => {},
  t: translations.tr,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [language, setLanguageState] = useState<Language>('tr');

  // Initialize language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('site_language') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_language', lang);
  };

  const t = translations[language];

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAdmin(u?.email === "alneval20@gmail.com");
    });

    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'settings', 'main'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    const unsubSettings = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SiteSettings);
      } else {
        // Default data if none exists
        setSettings({
          heroTitle: "Ruh Sağlığınız İçin Güvenli Bir Alan",
          heroTitle_en: "A Safe Space for Your Mental Health",
          heroSubtitle: "Bilimsel temelli psikolojik yöntemler ve danışan odaklı yaklaşımımızla, ruh sağlığınızı destekliyoruz. Güvenli, empatik ve profesyonel danışmanlık süreçlerimizle kendinizi keşfetme ve iyileşme yolculuğunuzda yanınızdayız.",
          heroSubtitle_en: "We support your mental health with evidence-based psychological methods and our client-centered approach. We are with you on your journey of self-discovery and healing with our safe, empathetic and professional counseling processes.",
          aboutText: "Girne Amerikan Üniversitesi Psikolojik Danışmanlık ve Rehberlik bölümünden %100 burslu ve onur öğrencisi olarak mezun olan Meleknur Budak, çocuk, ergen ve yetişkinlere yönelik profesyonel destek sunmaktadır. Lisans eğitimi süresince çeşitli seminer ve projelerde aktif olarak yer almıştır.",
          aboutText_en: "Meleknur Budak, who graduated from Girne American University, Department of Psychological Counseling and Guidance as an honor student with a 100% scholarship, provides professional support for children, adolescents, and adults. She actively participated in various seminars and projects during her undergraduate education.",
          aboutImage: "",
          email: "meleknurbudak4@gmail.com",
          instagram: "psk.dan.meleknurbudak",
          consultantName: "Meleknur Budak",
          consultantTitle: "Psikolojik Danışman",
          consultantTitle_en: "Psychological Counselor"
        });
      }
    }, (error) => {
      console.error("Settings fetch error:", error);
    });

    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const unsubServices = onSnapshot(q, (snapshot) => {
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      
      if (servicesData.length === 0) {
        // Default services
        setServices([
          { id: '1', title: 'Çocuk Danışmanlığı', title_en: 'Child Counseling', description: 'Çocukların duygusal ve sosyal gelişimlerini destekliyoruz.', description_en: 'We support the emotional and social development of children.', icon: 'Baby', order: 1 },
          { id: '2', title: 'Ergen Danışmanlığı', title_en: 'Adolescent Counseling', description: 'Ergenlik dönemindeki zorluklarla başa çıkma desteği.', description_en: 'Support for coping with the challenges of adolescence.', icon: 'User', order: 2 },
          { id: '3', title: 'Yetişkin Danışmanlığı', title_en: 'Adult Counseling', description: 'Bireysel farkındalık ve iyileşme süreci.', description_en: 'Individual awareness and healing process.', icon: 'Users', order: 3 },
          { id: '4', title: 'Online Bireysel Danışmanlık', title_en: 'Online Individual Counseling', description: 'Evinizin konforunda profesyonel destek.', description_en: 'Professional support in the comfort of your home.', icon: 'Globe', order: 4 }
        ]);
      } else {
        setServices(servicesData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Services fetch error:", error);
      setLoading(false);
    });

    return () => {
      unsubSettings();
      unsubServices();
      unsubAuth();
    };
  }, []);

  return (
    <DataContext.Provider value={{ settings, services, user, isAdmin, loading, language, setLanguage, t }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

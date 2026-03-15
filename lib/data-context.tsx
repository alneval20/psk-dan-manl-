'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, onSnapshot, collection, query, orderBy, getDocFromServer } from 'firebase/firestore';

interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutImage: string;
  email: string;
  instagram: string;
  consultantName: string;
  consultantTitle: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface DataContextType {
  settings: SiteSettings | null;
  services: Service[];
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  settings: null,
  services: [],
  loading: true,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          heroSubtitle: "Bilimsel temelli psikolojik yöntemler ve danışan odaklı yaklaşımımızla, ruh sağlığınızı destekliyoruz. Güvenli, empatik ve profesyonel danışmanlık süreçlerimizle kendinizi keşfetme ve iyileşme yolculuğunuzda yanınızdayız.",
          aboutText: "Girne Amerikan Üniversitesi Psikolojik Danışmanlık ve Rehberlik mezunu Meleknur Budak olarak, çocuk, ergen ve yetişkinlere yönelik profesyonel destek sunuyorum.",
          aboutImage: "https://picsum.photos/seed/psychology/800/600",
          email: "meleknurbudak4@gmail.com",
          instagram: "psk.dan.meleknurbudak",
          consultantName: "Meleknur Budak",
          consultantTitle: "Psikolojik Danışman"
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
          { id: '1', title: 'Çocuk Danışmanlığı', description: 'Çocukların duygusal ve sosyal gelişimlerini destekliyoruz.', icon: 'Baby', order: 1 },
          { id: '2', title: 'Ergen Danışmanlığı', description: 'Ergenlik dönemindeki zorluklarla başa çıkma desteği.', icon: 'User', order: 2 },
          { id: '3', title: 'Yetişkin Danışmanlığı', description: 'Bireysel farkındalık ve iyileşme süreci.', icon: 'Users', order: 3 },
          { id: '4', title: 'Online Bireysel Danışmanlık', description: 'Evinizin konforunda profesyonel destek.', icon: 'Globe', order: 4 }
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
    };
  }, []);

  return (
    <DataContext.Provider value={{ settings, services, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

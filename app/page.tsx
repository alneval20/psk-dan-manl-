'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import VisionApproach from '@/components/VisionApproach';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';
import { DataProvider } from '@/lib/data-context';

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Simple shortcut to show admin panel (e.g., double click footer or specific key)
  // In a real app, this would be a separate route or a hidden button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DataProvider>
      <main className="min-h-screen">
        {showAdmin ? (
          <div className="fixed inset-0 z-[100] bg-white overflow-auto">
            <AdminPanel onClose={() => setShowAdmin(false)} />
          </div>
        ) : (
          <>
            <Navbar />
            <Hero />
            <Services />
            <VisionApproach />
            <Contact />
            <Footer />
            {/* Hidden Admin Trigger in Footer */}
            <div 
              className="h-1 w-1 opacity-0 cursor-default" 
              onDoubleClick={() => setShowAdmin(true)}
            />
          </>
        )}
      </main>
    </DataProvider>
  );
}

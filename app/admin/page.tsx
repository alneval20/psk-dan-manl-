'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import { useData } from '@/lib/data-context';
import { DataProvider } from '@/lib/data-context';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function AdminContent() {
  const { user, isAdmin, loading } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-beige-50">
        <div className="animate-pulse text-pistachio-600 font-bold">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link 
        href="/"
        className="fixed top-6 right-6 z-[100] flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-bold rounded-xl shadow-lg hover:bg-pistachio-50 transition-all border border-beige-200"
      >
        <ArrowLeft className="w-4 h-4" /> Siteye Dön
      </Link>
      <AdminPanel />
    </div>
  );
}

export default function AdminPage() {
  return (
    <DataProvider>
      <AdminContent />
    </DataProvider>
  );
}

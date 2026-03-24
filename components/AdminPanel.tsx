'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { useData } from '@/lib/data-context';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Save, 
  Plus, 
  Trash2, 
  LogOut, 
  Settings, 
  Briefcase, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Clock,
  ChevronRight,
  Eye,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  onClose?: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const { user, isAdmin, loading: dataLoading, settings: currentSettings, services: currentServices } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'settings' | 'services' | 'appointments'>('settings');
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  const [settingsForm, setSettingsForm] = useState(currentSettings || {
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    aboutImage: "",
    email: "",
    instagram: "",
    consultantName: "",
    consultantTitle: ""
  });

  const [servicesList, setServicesList] = useState(currentServices);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const fetchAppointments = async () => {
    try {
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(list);
    } catch (error) {
      console.error("Fetch appointments error:", error);
    }
  };

  useEffect(() => {
    const loadAppointments = async () => {
      if (isAdmin) {
        await fetchAppointments();
      }
    };
    loadAppointments();
  }, [isAdmin]);

  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status: newStatus });
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      if (selectedAppointment?.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: newStatus });
      }
      setStatus({ type: 'success', message: 'Durum güncellendi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Güncelleme hatası.' });
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(prev => prev.filter(app => app.id !== id));
      if (selectedAppointment?.id === id) setSelectedAppointment(null);
      setStatus({ type: 'success', message: 'Talep silindi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Silme hatası.' });
    }
  };

  useEffect(() => {
    if (currentSettings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettingsForm(prev => {
        const isSame = JSON.stringify(prev) === JSON.stringify(currentSettings);
        return isSame ? prev : currentSettings;
      });
    }
    if (currentServices) {
      setServicesList(prev => {
        const isSame = JSON.stringify(prev) === JSON.stringify(currentServices);
        return isSame ? prev : currentServices;
      });
    }
  }, [currentSettings, currentServices]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await setDoc(doc(db, 'settings', 'main'), settingsForm);
      setStatus({ type: 'success', message: 'Ayarlar başarıyla kaydedildi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Kaydetme hatası: Yetkiniz olmayabilir.' });
    }
  };

  const handleAddService = async () => {
    const newService = {
      title: "Yeni Hizmet",
      description: "Hizmet açıklaması buraya gelecek.",
      icon: "Heart",
      order: servicesList.length + 1
    };
    try {
      await addDoc(collection(db, 'services'), newService);
      setStatus({ type: 'success', message: 'Hizmet eklendi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Ekleme hatası.' });
    }
  };

  const handleUpdateService = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, 'services', id), data);
      setStatus({ type: 'success', message: 'Hizmet güncellendi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Güncelleme hatası.' });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      setStatus({ type: 'success', message: 'Hizmet silindi.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Silme hatası.' });
    }
  };

  if (dataLoading) return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-beige-50 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Yönetim Paneli</h2>
          <p className="text-slate-600 mb-8">Lütfen yetkili hesabınızla giriş yapın.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-pistachio-600 text-white font-bold rounded-xl hover:bg-pistachio-700 transition-all flex items-center justify-center gap-2"
          >
            Google ile Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // Check if user is the admin email
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-beige-50 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Yetkisiz Erişim</h2>
          <p className="text-slate-600 mb-6">Bu bölüme erişim yetkiniz bulunmamaktadır.</p>
          <button 
            onClick={() => {
              signOut(auth);
              if (pathname === '/admin') router.push('/');
            }} 
            className="text-pistachio-600 font-bold"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-beige-200 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>

        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-pistachio-50 text-pistachio-700 font-bold' : 'text-slate-600 hover:bg-beige-50'}`}
          >
            <Settings className="w-5 h-5" /> Genel Ayarlar
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-pistachio-50 text-pistachio-700 font-bold' : 'text-slate-600 hover:bg-beige-50'}`}
          >
            <Briefcase className="w-5 h-5" /> Hizmetler
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-pistachio-50 text-pistachio-700 font-bold' : 'text-slate-600 hover:bg-beige-50'}`}
          >
            <Calendar className="w-5 h-5" /> Randevu Talepleri
          </button>
        </nav>

        <button 
          onClick={() => signOut(auth)}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all mb-2"
        >
          <LogOut className="w-5 h-5" /> Çıkış Yap
        </button>

        <button 
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              router.push('/');
            }
          }}
          className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-beige-50 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Siteye Dön
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow p-10 overflow-auto">
        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-pistachio-50 text-pistachio-700 border border-pistachio-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Genel Ayarlar</h2>
              <button 
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-pistachio-600 text-white font-bold rounded-xl hover:bg-pistachio-700 transition-all"
              >
                <Save className="w-5 h-5" /> Değişiklikleri Kaydet
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6 col-span-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Başlık</label>
                  <input 
                    type="text" 
                    value={settingsForm.heroTitle} 
                    onChange={e => setSettingsForm({...settingsForm, heroTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Alt Başlık</label>
                  <textarea 
                    rows={2}
                    value={settingsForm.heroSubtitle} 
                    onChange={e => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Danışman Adı</label>
                  <input 
                    type="text" 
                    value={settingsForm.consultantName} 
                    onChange={e => setSettingsForm({...settingsForm, consultantName: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">E-posta</label>
                  <input 
                    type="email" 
                    value={settingsForm.email} 
                    onChange={e => setSettingsForm({...settingsForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Instagram Kullanıcı Adı</label>
                  <input 
                    type="text" 
                    value={settingsForm.instagram} 
                    onChange={e => setSettingsForm({...settingsForm, instagram: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Görsel URL (Hakkımda)</label>
                  <input 
                    type="text" 
                    value={settingsForm.aboutImage} 
                    onChange={e => setSettingsForm({...settingsForm, aboutImage: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Hakkımda Metni</label>
                <textarea 
                  rows={6}
                  value={settingsForm.aboutText} 
                  onChange={e => setSettingsForm({...settingsForm, aboutText: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-beige-200 rounded-xl focus:ring-2 focus:ring-pistachio-500/20 outline-none" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="max-w-5xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Hizmetler</h2>
              <button 
                onClick={handleAddService}
                className="flex items-center gap-2 px-6 py-3 bg-pistachio-600 text-white font-bold rounded-xl hover:bg-pistachio-700 transition-all"
              >
                <Plus className="w-5 h-5" /> Yeni Hizmet Ekle
              </button>
            </div>

            <div className="grid gap-6">
              {servicesList.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-2xl border border-beige-200 shadow-sm flex gap-6 items-start">
                  <div className="w-16 h-16 bg-beige-50 rounded-xl flex items-center justify-center shrink-0">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-grow grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      value={service.title} 
                      onChange={e => handleUpdateService(service.id, { title: e.target.value })}
                      className="text-lg font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-beige-200 focus:border-pistachio-500 outline-none px-1"
                    />
                    <input 
                      type="text" 
                      value={service.icon} 
                      onChange={e => handleUpdateService(service.id, { icon: e.target.value })}
                      placeholder="Icon name (e.g. Heart, User)"
                      className="text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-beige-200 focus:border-pistachio-500 outline-none px-1"
                    />
                    <textarea 
                      rows={2}
                      value={service.description} 
                      onChange={e => handleUpdateService(service.id, { description: e.target.value })}
                      className="col-span-2 text-slate-600 bg-transparent border-b border-transparent hover:border-beige-200 focus:border-pistachio-500 outline-none px-1 resize-none"
                    />
                  </div>
                  <button 
                    onClick={() => handleDeleteService(service.id)}
                    className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Randevu Talepleri</h2>
              <button 
                onClick={fetchAppointments}
                className="p-2 text-pistachio-600 hover:bg-pistachio-50 rounded-lg transition-colors"
                title="Yenile"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* List */}
              <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {appointments.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-2xl border border-slate-100">
                    <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500">Henüz randevu talebi yok.</p>
                  </div>
                ) : (
                  appointments.map((app) => (
                    <div 
                      key={app.id}
                      onClick={() => setSelectedAppointment(app)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedAppointment?.id === app.id ? 'border-pistachio-300 bg-pistachio-50/30' : 'border-slate-100 bg-white hover:border-pistachio-200'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800">{app.name}</h3>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                          app.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'İletişime Geçildi' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {app.status || 'Bekliyor'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                        <Briefcase className="w-3 h-3" /> {app.service}
                      </div>
                      <div className="text-xs text-slate-400">
                        {app.createdAt?.toDate ? new Date(app.createdAt.toDate()).toLocaleDateString('tr-TR') : 'Tarih yok'}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Details */}
              <div className="lg:col-span-2">
                {selectedAppointment ? (
                  <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedAppointment.name}</h3>
                        <p className="text-pistachio-600 font-medium">{selectedAppointment.service}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İletişim Bilgileri</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-slate-600">
                            <MailIcon className="w-4 h-4 text-pistachio-500" />
                            <a href={`mailto:${selectedAppointment.email}`} className="hover:text-pistachio-600 transition-colors">{selectedAppointment.email}</a>
                          </div>
                          <div className="flex items-center gap-3 text-slate-600">
                            <PhoneIcon className="w-4 h-4 text-pistachio-500" />
                            <a href={`tel:${selectedAppointment.phone}`} className="hover:text-pistachio-600 transition-colors">{selectedAppointment.phone}</a>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tercih Edilen Zaman</h4>
                        <div className="flex items-center gap-3 text-slate-600">
                          <Clock className="w-4 h-4 text-pistachio-500" />
                          <span>{selectedAppointment.preferredDate || 'Belirtilmedi'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mesaj</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 leading-relaxed italic">
                        &quot;{selectedAppointment.message}&quot;
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Durumu Güncelle</h4>
                      <div className="flex flex-wrap gap-3">
                        {['Bekliyor', 'İletişime Geçildi', 'Tamamlandı'].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleUpdateAppointmentStatus(selectedAppointment.id, s)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                              selectedAppointment.status === s || (!selectedAppointment.status && s === 'Bekliyor')
                                ? 'bg-pistachio-600 text-white shadow-lg shadow-pistachio-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center">
                    <Eye className="w-12 h-12 text-slate-200 mb-4" />
                    <h3 className="text-lg font-bold text-slate-400">Detayları görüntülemek için bir talep seçin</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

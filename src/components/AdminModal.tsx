import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Edit2, 
  Plus, 
  Check, 
  AlertCircle, 
  Lock, 
  KeyRound, 
  Download, 
  FileJson, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { PhotoItem, ScheduleItem, GraduationEventInfo } from '../types';
import { validateImageFile, compressImage } from '../utils/imageCompressor';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onUpdatePhotos: (photos: PhotoItem[]) => void;
  schedule: ScheduleItem[];
  onUpdateSchedule: (schedule: ScheduleItem[]) => void;
  eventInfo: GraduationEventInfo;
  onUpdateEventInfo: (info: GraduationEventInfo) => void;
  onOpenGuide: () => void;
}

export function AdminModal({
  isOpen,
  onClose,
  photos,
  onUpdatePhotos,
  schedule,
  onUpdateSchedule,
  eventInfo,
  onUpdateEventInfo,
  onOpenGuide,
}: AdminModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tura_admin_logged_in') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'photos' | 'schedule' | 'info' | 'backup'>('photos');

  // Photo Upload State
  const [newTitle, setNewTitle] = useState('Wahitimu wa Kidato cha Nne');
  const [newCaption, setNewCaption] = useState('Wahitimu wa Kidato cha Nne 2026 Tura Secondary School');
  const [newCategory, setNewCategory] = useState('Wahitimu');
  const [newDate, setNewDate] = useState('2 Oktoba 2026');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Editing existing schedule item
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDesc, setNewScheduleDesc] = useState('');
  const [newScheduleSpeaker, setNewScheduleSpeaker] = useState('');

  // Notification message
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Handle Login Authentication
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('tura_admin_pin') || 'tura2026';
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tura_admin_logged_in', 'true');
      setAuthError('');
    } else {
      setAuthError('Nenosiri si sahihi. Nenosiri la awali ni: tura2026 (unaweza kulibadilisha).');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tura_admin_logged_in');
  };

  // Change PIN
  const handleChangePin = () => {
    const newPin = prompt('Weka nenosiri (PIN) jipya la usimamizi wa tovuti:');
    if (newPin && newPin.trim().length >= 4) {
      localStorage.setItem('tura_admin_pin', newPin.trim());
      alert('Nenosiri jipya limehifadhiwa kwa ufanisi!');
    } else if (newPin) {
      alert('Nenosiri lazima liwe na angalau herufi au tarakimu 4.');
    }
  };

  // Handle Photo File Selection & Client-Side Compression
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Faili halikubaliki.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsCompressing(true);
      // Auto-compress client-side to keep performance swift
      const compressedDataUrl = await compressImage(file, 1600, 1200, 0.85);
      setPreviewUrl(compressedDataUrl);
      setIsCompressing(false);
    } catch (err: any) {
      setIsCompressing(false);
      setUploadError('Hitilafu wakati wa kubana na kusoma picha. Tafadhali jaribu picha nyingine.');
    }
  };

  // Submit Photo Upload
  const handleAddPhoto = (e: FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setUploadError('Tafadhali chagua faili la picha kwanza.');
      return;
    }

    const newPhotoItem: PhotoItem = {
      id: 'custom_' + Date.now(),
      url: previewUrl,
      title: newTitle.trim() || 'Picha ya Mahafali',
      caption: newCaption.trim() || 'Picha ya Mahafali Tura Secondary School',
      category: newCategory,
      date: newDate.trim() || '2 Oktoba 2026',
      isPlaceholder: false,
    };

    const updated = [newPhotoItem, ...photos];
    onUpdatePhotos(updated);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showSuccess('Picha mpya imepakiwa na kuongezwa kwenye matukio!');
  };

  // Delete a Photo
  const handleDeletePhoto = (id: string) => {
    if (confirm('Je, una uhakika unataka kufuta picha hii?')) {
      const updated = photos.filter((p) => p.id !== id);
      onUpdatePhotos(updated);
      showSuccess('Picha imefutwa.');
    }
  };

  // Schedule Actions
  const handleAddScheduleItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newScheduleTime.trim() || !newScheduleTitle.trim()) {
      alert('Tafadhali jaza muda na jina la tukio la ratiba.');
      return;
    }

    const newItem: ScheduleItem = {
      id: 'sch_' + Date.now(),
      time: newScheduleTime.trim(),
      title: newScheduleTitle.trim(),
      description: newScheduleDesc.trim() || '[Hariri maelezo hapa]',
      speakerOrNote: newScheduleSpeaker.trim() || undefined,
      isPlaceholder: false,
    };

    onUpdateSchedule([...schedule, newItem]);
    setNewScheduleTime('');
    setNewScheduleTitle('');
    setNewScheduleDesc('');
    setNewScheduleSpeaker('');
    showSuccess('Kipengele kipya cha ratiba kimeongezwa!');
  };

  const handleDeleteScheduleItem = (id: string) => {
    if (confirm('Je, una uhakika unataka kufuta kipengele hiki cha ratiba?')) {
      onUpdateSchedule(schedule.filter((s) => s.id !== id));
      showSuccess('Kipengele cha ratiba kimefutwa.');
    }
  };

  const handleUpdateScheduleField = (id: string, field: keyof ScheduleItem, value: string) => {
    const updated = schedule.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value, isPlaceholder: false };
      }
      return item;
    });
    onUpdateSchedule(updated);
  };

  // Event Info Update
  const handleInfoChange = (field: keyof GraduationEventInfo, val: string) => {
    onUpdateEventInfo({
      ...eventInfo,
      [field]: val,
    });
  };

  // Export JSON Backup
  const handleExportJson = () => {
    const backupData = {
      eventInfo,
      schedule,
      photos: photos.filter((p) => !p.url.startsWith('blob:')), // save full state
      exportDate: new Date().toISOString(),
      appName: 'Tura Secondary School Graduation 2026',
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tura_secondary_data_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showSuccess('Faili la backup (JSON) limepakuliwa!');
  };

  // Import JSON Backup
  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.eventInfo) onUpdateEventInfo(parsed.eventInfo);
        if (parsed.schedule) onUpdateSchedule(parsed.schedule);
        if (parsed.photos) onUpdatePhotos(parsed.photos);
        showSuccess('Taarifa zote zimerudishwa kutoka kwenye backup!');
      } catch (err) {
        alert('Faili halina muundo sahihi wa JSON ya tovuti hii.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Jopo la Usimamizi (Admin & Content Manager)
              </h2>
              <p className="text-xs text-slate-300">
                Tura Secondary School – Wilaya ya Uyui, Tabora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10"
              >
                Toka
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold py-2 px-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* If Not Authenticated: Login Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-900 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Ingia Katika Usimamizi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Sehemu hii imelindwa ili kuzuia mabadiliko yasiyoidhinishwa. Weka nenosiri la shule ili kuendelea.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Weka nenosiri (Awali: tura2026)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-center tracking-widest"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-600 font-medium mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all"
              >
                Fungua Jopo la Usimamizi
              </button>

              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                Kidokezo: Nenosiri la awali kwa ajili ya usanidi ni: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-800">tura2026</code>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 px-6 pt-3 bg-slate-50 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'photos'
                    ? 'border-blue-600 text-blue-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Picha za Mahafali ({photos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'schedule'
                    ? 'border-blue-600 text-blue-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Ratiba ({schedule.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'info'
                    ? 'border-blue-600 text-blue-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Taarifa za Shule & Matini</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-blue-600 text-blue-800 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileJson className="w-4 h-4" />
                <span>Hifadhi & Backup</span>
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: PHOTOS */}
              {activeTab === 'photos' && (
                <div className="space-y-8">
                  {/* Photo Upload Form */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Pakia Picha Mpya (JPG, JPEG, PNG, WEBP)</span>
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Picha inaboreshwa na kubanwa kiotomatiki (automatic resize/compress) ili kuhakikisha website inafunguka haraka hata kwa mtandao wa simu.
                    </p>

                    <form onSubmit={handleAddPhoto} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* File Picker */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Faili la Picha:
                          </label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleFileChange}
                            className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer border border-slate-200 rounded-xl p-1 bg-white"
                          />
                          {isCompressing && (
                            <p className="text-xs text-blue-600 font-semibold mt-1">
                              Inabana picha kiotomatiki...
                            </p>
                          )}
                          {uploadError && (
                            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{uploadError}</span>
                            </p>
                          )}
                        </div>

                        {/* Title */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Kichwa cha Picha (Title):
                          </label>
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Mfano: Wahitimu wa Kidato cha Nne"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        {/* Caption */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Maelezo ya Picha (Caption):
                          </label>
                          <input
                            type="text"
                            value={newCaption}
                            onChange={(e) => setNewCaption(e.target.value)}
                            placeholder="Mfano: Baadhi ya wahitimu wa Kidato cha Nne – 2026"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        {/* Category & Date */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Aina (Category):
                            </label>
                            <select
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Wahitimu">Wahitimu</option>
                              <option value="Picha ya pamoja ya wahitimu">Picha ya pamoja ya wahitimu</option>
                              <option value="Walimu">Walimu</option>
                              <option value="Picha za viongozi na walimu">Picha za viongozi na walimu</option>
                              <option value="Wageni">Wageni</option>
                              <option value="Shughuli za mahafali">Shughuli za mahafali</option>
                              <option value="Sherehe">Sherehe</option>
                              <option value="Shule">Shule</option>
                              <option value="Uwanja wa mahafali">Uwanja wa mahafali</option>
                              <option value="Wanafunzi">Wanafunzi</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Tarehe (Date):
                            </label>
                            <input
                              type="text"
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Image Preview Box */}
                      {previewUrl && (
                        <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl">
                          <img
                            src={previewUrl}
                            alt="Hakikisho"
                            className="w-20 h-16 object-cover rounded-lg border border-slate-200"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Picha imeboreshwa na ipo tayari
                            </span>
                            <p className="text-slate-500 mt-0.5">
                              {newTitle} • {newCategory}
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={!previewUrl || isCompressing}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Hifadhi na Ongeza Kwenye Matukio</span>
                      </button>
                    </form>
                  </div>

                  {/* List of Existing Photos */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Picha Zilizopo kwenye Tovuti ({photos.length})
                      </h4>
                      <span className="text-xs text-slate-500">
                        Unaweza kufuta picha za mfano au kupakia picha mpya halisi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {photos.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 items-center shadow-xs"
                        >
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-16 h-14 object-cover rounded-lg bg-slate-900 border border-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <h5 className="font-bold text-slate-900 truncate">
                              {item.title}
                            </h5>
                            <span className="inline-block text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-semibold truncate max-w-full">
                              {item.category}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {item.isPlaceholder ? 'Picha ya Mfano' : 'Picha Halisi'}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeletePhoto(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Futa Picha"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SCHEDULE */}
              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  {/* Add New Schedule Item */}
                  <form onSubmit={handleAddScheduleItem} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-slate-900 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Ongeza Tukio Jipya kwenye Ratiba
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Muda (Mf. 14:00):</label>
                        <input
                          type="text"
                          value={newScheduleTime}
                          onChange={(e) => setNewScheduleTime(e.target.value)}
                          placeholder="14:00"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Jina la Shughuli:</label>
                        <input
                          type="text"
                          value={newScheduleTitle}
                          onChange={(e) => setNewScheduleTitle(e.target.value)}
                          placeholder="Mf. Chakula cha Mchana"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Msimamizi / Mhusika:</label>
                        <input
                          type="text"
                          value={newScheduleSpeaker}
                          onChange={(e) => setNewScheduleSpeaker(e.target.value)}
                          placeholder="Mf. Kamati ya Maandalizi"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Maelezo ya Ziada:</label>
                      <input
                        type="text"
                        value={newScheduleDesc}
                        onChange={(e) => setNewScheduleDesc(e.target.value)}
                        placeholder="Maelezo mafupi kuhusu shughuli hii..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs"
                    >
                      Ongeza kwenye Ratiba
                    </button>
                  </form>

                  {/* Existing Items */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Vipengele vya Ratiba Vilivyopo (Unaweza kubadilisha maandishi moja kwa moja):
                    </h4>

                    {schedule.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={item.time}
                            onChange={(e) => handleUpdateScheduleField(item.id, 'time', e.target.value)}
                            className="w-24 px-2 py-1 font-mono font-bold text-xs bg-slate-100 rounded-lg border border-slate-200"
                            placeholder="Muda"
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateScheduleField(item.id, 'title', e.target.value)}
                            className="flex-1 px-3 py-1 font-bold text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-200"
                            placeholder="Kichwa cha tukio"
                          />
                          <button
                            onClick={() => handleDeleteScheduleItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Futa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          value={item.description}
                          onChange={(e) => handleUpdateScheduleField(item.id, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-1.5 text-xs text-slate-600 bg-slate-50/50 rounded-lg border border-slate-200"
                          placeholder="Maelezo ya ratiba..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EVENT INFO */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Taarifa za Shule na Tukio
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jina la Shule:</label>
                        <input
                          type="text"
                          value={eventInfo.schoolName}
                          onChange={(e) => handleInfoChange('schoolName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tukio:</label>
                        <input
                          type="text"
                          value={eventInfo.eventName}
                          onChange={(e) => handleInfoChange('eventName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tarehe ya Tukio:</label>
                        <input
                          type="text"
                          value={eventInfo.eventDateString}
                          onChange={(e) => handleInfoChange('eventDateString', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mahali / Wilaya / Mkoa:</label>
                        <input
                          type="text"
                          value={eventInfo.heroSubheadline}
                          onChange={(e) => handleInfoChange('heroSubheadline', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Kauli Mbiu ya Shule (School Motto):</label>
                        <input
                          type="text"
                          value={eventInfo.schoolMotto || 'Education for Liberation'}
                          onChange={(e) => handleInfoChange('schoolMotto', e.target.value)}
                          placeholder="Mfano: Education for Liberation"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ujumbe wa Karibu (Hero Message):</label>
                      <textarea
                        value={eventInfo.heroMessage}
                        onChange={(e) => handleInfoChange('heroMessage', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kuhusu Mahafali (About Section):</label>
                      <textarea
                        value={eventInfo.aboutText}
                        onChange={(e) => handleInfoChange('aboutText', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => showSuccess('Taarifa zimehifadhiwa!')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Hifadhi Mabadiliko
                      </button>
                    </div>
                  </div>

                  {/* Security PIN Change */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Nenosiri la Usimamizi (Admin PIN)</h5>
                      <p className="text-[11px] text-slate-500">Badilisha nenosiri la kuingia kwenye jopo hili.</p>
                    </div>
                    <button
                      onClick={handleChangePin}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
                    >
                      Badilisha Nenosiri
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: BACKUP & EXPORT */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span>Pakua na Uhifadhi Nakala ya Data (Export / Import Backup)</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unaweza kupakua taarifa zote ulizobadilisha (picha mpya, ratiba, matini) kama faili la JSON. Ukihama kompyuta au ukitaka kupeleka kwenye hosting nyingine, unaweza kupakia faili hilo kurudisha kila kitu papo hapo.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={handleExportJson}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Pakua Backup (JSON)</span>
                      </button>

                      <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs cursor-pointer shadow-xs">
                        <Upload className="w-4 h-4 text-emerald-600" />
                        <span>Pakia Backup ya JSON</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJson}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-blue-900">Mwongozo Kamili wa Ku-deploy</h5>
                      <p className="text-[11px] text-blue-700">Hatua kwa hatua jinsi ya kuiweka website hewani mtandaoni bure.</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenGuide();
                      }}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
                    >
                      Soma Mwongozo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

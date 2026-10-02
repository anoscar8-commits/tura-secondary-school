import { useState } from 'react';
import { School, BookOpen, Trophy, Users, Award, Calendar } from 'lucide-react';
import { PhotoItem } from '../types';

interface SchoolLifeGalleryProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
}

export function SchoolLifeGallery({ photos, onSelectPhoto }: SchoolLifeGalleryProps) {
  const [activeTab, setActiveTab] = useState<string>('Zote');

  const categories = [
    { name: 'Zote', icon: School },
    { name: 'Wanafunzi', icon: Users },
    { name: 'Walimu', icon: Award },
    { name: 'Masomo', icon: BookOpen },
    { name: 'Michezo', icon: Trophy },
    { name: 'Shughuli za shule', icon: Calendar },
    { name: 'Mahafali', icon: Award },
  ];

  const filtered = photos.filter((p) => {
    if (activeTab === 'Zote') return true;
    return p.category.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-2">
            <School className="w-4 h-4 text-emerald-700" />
            <span>Maisha ya Kila Siku Shuleni</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            🏫 MAISHA YA TURA SECONDARY SCHOOL
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Kushuhudia mazingira, taaluma, vipaji na nidhamu ya wanafunzi wetu katika Wilaya ya Uyui, Mkoa wa Tabora.
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onSelectPhoto(item)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

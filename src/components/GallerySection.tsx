import { useState, useMemo } from 'react';
import { 
  Camera, 
  Upload, 
  Maximize2, 
  Calendar, 
  Info, 
  Sparkles, 
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { PhotoItem } from '../types';

interface GallerySectionProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onOpenUpload: () => void;
}

export function GallerySection({ photos, onSelectPhoto, onOpenUpload }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Zote');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Zote',
    'Wahitimu',
    'Picha ya pamoja ya wahitimu',
    'Walimu',
    'Picha za viongozi na walimu',
    'Wageni',
    'Shughuli za mahafali',
    'Sherehe',
    'Shule',
    'Uwanja wa mahafali',
  ];

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchesCategory =
        selectedCategory === 'Zote' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Wahitimu' && p.category.includes('Wahitimu')) ||
        (selectedCategory === 'Walimu' && p.category.includes('Walimu'));

      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [photos, selectedCategory, searchQuery]);

  return (
    <section id="picha" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4 text-blue-700" />
              <span>Kumbukumbu ya Picha</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              📸 PICHA ZA MAHAFALI
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Tazama matukio ya picha za mahafali ya Kidato cha Nne Tura Secondary School. Unaweza kupakia picha zako halisi wakati wowote.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto hover:shadow-lg hover:-translate-y-0.5"
          >
            <Upload className="w-4 h-4" />
            <span>Pakia Picha Zako Hapa</span>
          </button>
        </div>

        {/* Notice on Demo / Placeholder Images */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Ujumbe Kuhusu Picha za Awali (Demo/Placeholders):</span>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Picha zilizopo kwa sasa ni picha za mfano zinazoonyesha mazingira na sare za shule za sekondari za Tanzania (sketi za samawati na kijani, mashati meupe, suruali za kijani). Picha hizi ni placeholders na hazidai kuwa wanafunzi halisi wa Tura Secondary School. Unaweza kuzibadilisha na picha zako halisi wakati wowote kupitia kitufe cha &quot;Pakia Picha&quot;.
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Aina:
            </span>
            {categories.map((cat) => {
              const count =
                cat === 'Zote'
                  ? photos.length
                  : photos.filter((p) => p.category.toLowerCase().includes(cat.toLowerCase())).length;

              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tafuta picha kwa maelezo..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>

        {/* Gallery Grid (1-2 columns mobile, 3-4 columns desktop) */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Hakuna picha zilizopatikana</h3>
            <p className="text-xs text-slate-500 mt-1">
              Jaribu kubadilisha aina ya picha au maneno uliyotafuta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id || index}
                onClick={() => onSelectPhoto(photo)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
                    <span className="text-xs font-semibold flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Bonyeza kutazama kubwa
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-900/90 text-white backdrop-blur-xs shadow-xs">
                      {photo.category}
                    </span>
                  </div>

                  {photo.isPlaceholder ? (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 shadow-xs">
                        Demo
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600/90 text-white shadow-xs flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Halisi
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {photo.date}
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                      Tazama
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Upload CTA Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Je, una picha za mahafali?</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white">
              Badilisha picha hizi na picha zako halisi za sherehe
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Mfumo wetu unakuwezesha kupakia picha za muundo wa JPG, JPEG, PNG au WEBP. Picha zitawekwa ukubwa unaofaa kiotomatiki ili tovuti ibaki na kasi ya juu.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            type="button"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-transform hover:scale-105"
          >
            <Upload className="w-4 h-4 text-slate-950" />
            <span>Pakia Picha Sasa</span>
          </button>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Info, Calendar, Tag } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
}

export function LightboxModal({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!photo) return null;

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between items-center p-2 sm:p-4 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Picha Kubwa"
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between py-2 px-3 text-white border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} kati ya {totalCount}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/80 text-white uppercase">
            {photo.category}
          </span>
          {photo.isPlaceholder && (
            <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Picha ya Mfano (Demo)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadImage}
            type="button"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Pakua picha"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg bg-white/10 hover:bg-red-600 text-white transition-colors"
            title="Funga (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-auto overflow-hidden">
        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            type="button"
            className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white shadow-xl transition-transform hover:scale-110 border border-white/20"
            aria-label="Picha iliyotangulia"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Image */}
        <div className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full flex items-center justify-center p-2">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            type="button"
            className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white shadow-xl transition-transform hover:scale-110 border border-white/20"
            aria-label="Picha inayofuata"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Metadata Box */}
      <div className="w-full max-w-4xl bg-slate-900/90 border border-white/10 rounded-2xl p-4 text-white shadow-xl mb-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <h3 className="text-base sm:text-lg font-black text-white">
            {photo.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {photo.date}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              {photo.category}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {photo.caption}
        </p>

        {photo.isPlaceholder && (
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-amber-300">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              Picha hii ni ya mfano inayoakisi wanafunzi na mazingira ya shule za Tanzania. Unaweza kuibadilisha na picha halisi kupitia sehemu ya &quot;Simamia Tovuti&quot;.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import { GraduationCap, School, Calendar, MapPin, Award } from 'lucide-react';
import { EventHighlight } from '../types';

interface EventHighlightsProps {
  highlights: EventHighlight[];
}

export function EventHighlights({ highlights }: EventHighlightsProps) {
  const getIcon = (iconType: EventHighlight['icon']) => {
    switch (iconType) {
      case 'grad':
        return <GraduationCap className="w-7 h-7 text-blue-600" />;
      case 'school':
        return <School className="w-7 h-7 text-emerald-600" />;
      case 'calendar':
        return <Calendar className="w-7 h-7 text-amber-500" />;
      case 'map':
        return <MapPin className="w-7 h-7 text-red-500" />;
      case 'trophy':
        return <Award className="w-7 h-7 text-purple-600" />;
      default:
        return <GraduationCap className="w-7 h-7 text-blue-600" />;
    }
  };

  const getBorderColor = (iconType: EventHighlight['icon']) => {
    switch (iconType) {
      case 'grad':
        return 'hover:border-blue-500/60 group-hover:bg-blue-50/50';
      case 'school':
        return 'hover:border-emerald-500/60 group-hover:bg-emerald-50/50';
      case 'calendar':
        return 'hover:border-amber-500/60 group-hover:bg-amber-50/50';
      case 'map':
        return 'hover:border-red-500/60 group-hover:bg-red-50/50';
      case 'trophy':
        return 'hover:border-purple-500/60 group-hover:bg-purple-50/50';
      default:
        return 'hover:border-blue-500/60';
    }
  };

  return (
    <section id="mahafali" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-md">
            Mambo Makuu ya Tukio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Taarifa Muhimu za Mahafali 2026
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Muhtasari wa taarifa muhimu za siku ya Mahafali ya Kidato cha Nne Tura Secondary School.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlights.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${getBorderColor(
                item.icon
              )}`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  {getIcon(item.icon)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 leading-snug">
                  {item.value}
                </h3>
              </div>

              {item.subtext && (
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Calendar, Clock, Edit3, CheckCircle2, Plus } from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
  onOpenEditSchedule: () => void;
}

export function ScheduleSection({ schedule, onOpenEditSchedule }: ScheduleSectionProps) {
  return (
    <section id="ratiba" className="py-16 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mpangilio wa Siku</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              📋 RATIBA YA MAHAFALI
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Ratiba ya matukio na shughuli za siku ya mahafali. Unaweza kubadilisha muda na shughuli kupitia jopo la uongozi.
            </p>
          </div>

          <button
            onClick={onOpenEditSchedule}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Hariri Ratiba Hapa</span>
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/40 space-y-6 sm:space-y-8 my-4 ml-3 sm:ml-6">
          {schedule.map((item, index) => (
            <div key={item.id || index} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-blue-900 text-amber-300 border-4 border-slate-100 flex items-center justify-center text-[10px] font-bold shadow">
                {index + 1}
              </div>

              {/* Card content */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all group-hover:border-blue-400">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 bg-blue-900 text-white px-3 py-1 rounded-lg font-mono font-bold text-xs sm:text-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.time}</span>
                  </div>

                  {item.speakerOrNote && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {item.speakerOrNote}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {item.description}
                </p>

                {item.isPlaceholder && (
                  <div className="mt-3 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[11px] text-amber-700">
                    <span className="italic flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Placeholder: Unaweza kurekebisha maelezo haya
                    </span>
                    <button
                      onClick={onOpenEditSchedule}
                      className="text-blue-700 hover:text-blue-900 font-bold underline"
                    >
                      Hariri
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note at bottom */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 flex items-start gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800">Ushauri kwa Wageni na Wazazi:</span>
            <p className="mt-0.5">
              Tafadhali fika mapema kabla ya saa mbili asubuhi (08:00 AM) ili kuwezesha mapokezi na ufunguzi kufanyika kwa wakati uliopangwa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Flame, ShieldCheck, BookOpen, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { defaultMessagePillars } from '../data/defaultData';

export function GraduatesMessage() {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-red-500" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="wahitimu" className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/30 to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-2">
            <span>Ushauri na Wosia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            💙 UJUMBE KWA WAHITIMU
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Neno la heri, hekima na matumaini mema kwa wahitimu wa Kidato cha Nne wa Tura Secondary School mnapoelekea hatua nyingine ya safari yenu ya kimaisha na kitaaluma.
          </p>
        </div>

        {/* 6 Pillars of Advice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultMessagePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                {getPillarIcon(pillar.iconName)}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white border border-blue-900/60 shadow-lg text-center max-w-4xl mx-auto">
          <p className="text-base sm:text-xl font-medium italic text-slate-100 mb-3">
            &ldquo;Elimu ni ufunguo wa maisha. Maarifa, nidhamu na uzalendo mlioupata hapa Tura Secondary School viwe taa inayomulika njia yenu kuelekea mustakabali angavu.&rdquo;
          </p>
          <div className="text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider">
            – Uongozi wa Walimu na Shule ya Sekondari Tura, Uyui Tabora
          </div>
        </div>
      </div>
    </section>
  );
}

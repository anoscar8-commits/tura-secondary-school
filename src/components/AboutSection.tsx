import { GraduationCap, Heart, Users, MapPin, CheckCircle, Award } from 'lucide-react';
import { GraduationEventInfo } from '../types';
import ukumbiMezaKuuImg from '../assets/images/tura_ukumbi_mezakuu_1790922163659.jpg';

interface AboutSectionProps {
  eventInfo: GraduationEventInfo;
}

export function AboutSection({ eventInfo }: AboutSectionProps) {
  return (
    <section id="kuhusu" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 relative group">
                <img
                  src={ukumbiMezaKuuImg}
                  alt="Ukumbi na Meza Kuu ya Tura Secondary Graduation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-600 px-2.5 py-1 rounded">
                    Meza Kuu Mbele ya Ukumbi
                  </span>
                  <p className="text-sm font-semibold mt-1 drop-shadow">
                    Meza Kuu ikiwa mbele na wahitimu katika sare za kijani bila majoho • Uyui, Tabora
                  </p>
                </div>
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-blue-950 text-white p-4 rounded-2xl shadow-xl border border-blue-800 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 uppercase font-semibold">Tukio Maalum</div>
                    <div className="text-sm font-bold text-white">Kidato cha Nne 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Taarifa Rasmi</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              🎓 KUHUSU MAHAFALI
            </h2>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-5 rounded-r-2xl mb-6">
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                &ldquo;{eventInfo.aboutText}&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Mahafali haya ni kielelezo cha ushirikiano dhabiti kati ya wanafunzi, uongozi wa shule ya sekondari ya Tura, wazazi na jamii nzima ya Wilaya ya Uyui na Mkoa wa Tabora. Ni fursa ya kutoa heshima kwa miaka minne ya nidhamu, bidii ya masomo na malezi mema.
            </p>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Kutambua Safari ya Masomo</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Kupongeza hatua ya kukamilisha miaka 4 ya sekondari.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Mshikamano wa Jamii</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Kukutanisha wazazi, walimu, walezi na wageni waalikwa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Malezi na Maadili Mema</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Kuwanoa vijana kuwa raia wema na viongozi wa kesho.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Wilaya ya Uyui, Tabora</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Fahari ya elimu ya sekondari mkoani Tabora.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#ratiba"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <span>Angalia Ratiba ya Shughuli</span>
              </a>
              <a
                href="#picha"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs sm:text-sm border border-blue-200 transition-all"
              >
                <span>Tazama Picha za Mahafali</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

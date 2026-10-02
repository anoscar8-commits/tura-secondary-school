import { GraduationCap, MapPin, Calendar, Heart, Shield, Settings, HelpCircle, Phone, Mail, Share2 } from 'lucide-react';
import { GraduationEventInfo } from '../types';

interface FooterProps {
  eventInfo: GraduationEventInfo;
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
}

export function Footer({ eventInfo, onOpenAdmin, onOpenGuide }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialPlaceholders = [
    { name: 'Facebook', note: '[Ukurasa Rasmi wa Shule Utatangazwa]' },
    { name: 'Instagram', note: '[Akaunti Rasmi ya Shule Itatangazwa]' },
    { name: 'YouTube', note: '[Kituo cha Video cha Shule Kitatangazwa]' },
    { name: 'WhatsApp', note: '[Kundi Rasmi la Wazazi na Wahitimu]' },
  ];

  return (
    <footer id="mawasiliano" className="bg-slate-950 text-slate-300 border-t border-blue-900/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-wide font-serif">
                  {eventInfo.schoolName}
                </h3>
                <p className="text-xs text-blue-300">
                  {eventInfo.district}, {eventInfo.region}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kituo cha malezi, nidhamu na maarifa bora kwa vijana wa Sekondari katika Mkoa wa Tabora, Tanzania.
            </p>

            <div className="text-xs text-emerald-400 font-semibold italic">
              Motto: &ldquo;{eventInfo.schoolMotto || 'Education for Liberation'}&rdquo;
            </div>

            <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{eventInfo.eventName}</span>
            </div>
          </div>

          {/* Col 2: Mahali & Anwani */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Mahali & Mawasiliano
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {eventInfo.location},<br />
                  {eventInfo.district}, {eventInfo.region}, {eventInfo.country}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>[Namba ya Simu ya Shule: Placeholder]</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>[Barua Pepe ya Shule: Placeholder]</span>
              </div>
            </div>
          </div>

          {/* Col 3: Social Media Placeholders */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Mitandao ya Kijamii
            </h4>
            <p className="text-[11px] text-slate-400 mb-2">
              Sehemu za viunganishi vya mitandao ya kijamii (zitawekwa rasmi):
            </p>
            <div className="space-y-2">
              {socialPlaceholders.map((social) => (
                <div
                  key={social.name}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-white">{social.name}</span>
                  <span className="text-[10px] text-slate-400 italic">
                    {social.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Quick Links & Admin Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Uendeshaji wa Tovuti
            </h4>
            <p className="text-xs text-slate-400">
              Uongozi unaweza kubadilisha picha, ratiba, ujumbe na taarifa za shule wakati wowote:
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Jopo la Usimamizi (Admin)</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition-all border border-white/15"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Mwongozo wa Ku-deploy Mtandaoni</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} <strong>{eventInfo.schoolName}</strong> – {eventInfo.district}, {eventInfo.region}, Tanzania. Haki zote zimehifadhiwa.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Mahafali ya Kidato cha Nne – 2026</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Tanzania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { GraduationCap, ArrowRight, Share2, Sparkles, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { GraduationEventInfo } from '../types';
import bannerImg from '../assets/images/tura_grad_banner_1790920104480.jpg';

interface HeroProps {
  eventInfo: GraduationEventInfo;
  isToday: boolean;
  onTriggerConfetti: () => void;
}

export function Hero({ eventInfo, isToday, onTriggerConfetti }: HeroProps) {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `🎓 *${eventInfo.schoolName} – ${eventInfo.eventName}*\n` +
      `📅 Leo, ${eventInfo.eventDateString}\n` +
      `📍 ${eventInfo.heroSubheadline}\n\n` +
      `Karibu kusherehekea nasi siku muhimu ya kuhitimu kwa wanafunzi wa Kidato cha Nne! Tazama picha na ratiba ya tukio hapa:\n` +
      `${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center">
      {/* Background Image with Dark Blue & Emerald Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Mahafali ya Kidato cha Nne Tura Secondary School"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-blue-950/85"></div>
        <div className="absolute inset-0 bg-radial at-top-left from-blue-900/40 via-transparent to-emerald-950/30"></div>
      </div>

      {/* Decorative Gold & Green Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Status Badge: LEO NI SIKU YA MAHAFALI */}
          <div className="inline-flex flex-wrap items-center gap-2 mb-6">
            {isToday ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-950/50 backdrop-blur-md animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                <span>🎓 LEO NI SIKU YA MAHAFALI!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-semibold text-xs backdrop-blur-md">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Tarehe Rasmi: {eventInfo.eventDateString}</span>
              </div>
            )}

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-300 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{eventInfo.heroSubheadline}</span>
            </div>
          </div>

          {/* School Name & Welcome Greeting */}
          <div className="mb-3">
            <span className="inline-block text-amber-400 font-extrabold tracking-widest text-xs sm:text-sm uppercase font-mono bg-amber-400/10 px-3 py-1 rounded border border-amber-400/20 mb-2">
              {eventInfo.heroGreeting}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4">
            {eventInfo.heroHeadline}
          </h1>

          {/* Date & Location Callout */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-blue-200 text-sm sm:text-base font-semibold mb-6">
            <div className="flex items-center gap-1.5 text-white bg-blue-900/60 border border-blue-700/50 px-3 py-1 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Leo, {eventInfo.eventDateString}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{eventInfo.heroSubheadline}</span>
            </div>
          </div>

          {/* Welcoming Message */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl">
            &ldquo;{eventInfo.heroMessage}&rdquo;
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <a
              href="#picha"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50 transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-400"
            >
              <span>TAZAMA PICHA ZA MAHAFALI</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#kuhusu"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/20 hover:border-white/30 backdrop-blur-md transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-white/40"
            >
              <span>KUHUSU MAHAFALI</span>
            </a>

            <button
              onClick={onTriggerConfetti}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-md transition-all hover:scale-105"
              title="Sherehekea na uwapongeze wahitimu!"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Pongeza Wahitimu 🎉</span>
            </button>
          </div>

          {/* Social Share Callout */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Taarifa rasmi kwa wazazi, walezi na wageni:
            </span>
            <button
              onClick={shareOnWhatsApp}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Shiriki WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

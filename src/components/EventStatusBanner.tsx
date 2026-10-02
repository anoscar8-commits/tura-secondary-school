import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { getEventStatus, EventStatusResult } from '../utils/dateStatus';

interface EventStatusBannerProps {
  simulatedState: 'auto' | 'before' | 'today' | 'after';
  onStateChange: (state: 'auto' | 'before' | 'today' | 'after') => void;
  onCelebrate: () => void;
}

export function EventStatusBanner({
  simulatedState,
  onStateChange,
  onCelebrate,
}: EventStatusBannerProps) {
  const [status, setStatus] = useState<EventStatusResult>(getEventStatus(simulatedState));
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setStatus(getEventStatus(simulatedState));

      const now = new Date();
      // Format local time & date in Swahili
      const timeStr = now.toLocaleTimeString('sw-TZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const dateStr = now.toLocaleDateString('sw-TZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentTimeStr(timeStr);
      setCurrentDateStr(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [simulatedState]);

  return (
    <section className="bg-slate-900 border-y border-blue-900/40 text-white relative z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Status Information */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div
              className={`p-3 rounded-2xl flex-shrink-0 ${
                status.state === 'today'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-950/40'
                  : status.state === 'before'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {status.state === 'today' ? (
                <Sparkles className="w-6 h-6 animate-spin text-emerald-300" style={{ animationDuration: '8s' }} />
              ) : status.state === 'before' ? (
                <Clock className="w-6 h-6 text-sky-400" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-amber-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {status.badgeText}
                </span>
                <span className="text-xs text-blue-300 font-mono">
                  Saa za Afrika Mashariki (EAT)
                </span>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white mt-0.5">
                {status.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {status.subtext}
              </p>
            </div>
          </div>

          {/* Right Side: Status Display or Countdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-stretch lg:self-auto justify-between lg:justify-end">
            {/* If Today: Celebration action */}
            {status.state === 'today' && (
              <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2.5 rounded-xl">
                <div>
                  <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                    Tukio Linaendelea Leo
                  </div>
                  <div className="text-sm font-semibold text-white">
                    2 Oktoba 2026 • Uyui, Tabora
                  </div>
                </div>
                <button
                  onClick={onCelebrate}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Shangwe!</span>
                </button>
              </div>
            )}

            {/* If Before: Countdown tiles */}
            {status.state === 'before' && status.countdown && (
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-800/90 border border-blue-900/60 rounded-xl px-2.5 py-1.5 min-w-[54px]">
                  <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                    {String(status.countdown.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">SIKU</div>
                </div>
                <div className="bg-slate-800/90 border border-blue-900/60 rounded-xl px-2.5 py-1.5 min-w-[54px]">
                  <div className="text-lg sm:text-xl font-black text-white font-mono">
                    {String(status.countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">MASAA</div>
                </div>
                <div className="bg-slate-800/90 border border-blue-900/60 rounded-xl px-2.5 py-1.5 min-w-[54px]">
                  <div className="text-lg sm:text-xl font-black text-white font-mono">
                    {String(status.countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">DAKIKA</div>
                </div>
                <div className="bg-slate-800/90 border border-blue-900/60 rounded-xl px-2.5 py-1.5 min-w-[54px]">
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
                    {String(status.countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">SEKUNDE</div>
                </div>
              </div>
            )}

            {/* If After: Event completed card */}
            {status.state === 'after' && (
              <div className="bg-slate-800/90 border border-amber-500/30 px-4 py-2 rounded-xl text-left">
                <div className="text-xs font-bold text-amber-400">
                  Kumbukumbu ya 2026
                </div>
                <div className="text-xs text-slate-300">
                  Tazama picha na historia ya mahafali hapa chini
                </div>
              </div>
            )}

            {/* Live Clock Display */}
            <div className="hidden md:flex flex-col text-right pl-3 border-l border-white/10 text-xs">
              <span className="text-slate-400 capitalize">{currentDateStr}</span>
              <span className="font-mono text-blue-300 font-bold text-sm tracking-wider">
                {currentTimeStr} EAT
              </span>
            </div>
          </div>
        </div>

        {/* State Simulator Selector for Testing / Previewing */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Kijaribu Hali ya Tarehe (Simulator):</span>
          </div>
          <div className="inline-flex rounded-lg bg-slate-950/80 p-0.5 border border-white/10">
            <button
              onClick={() => onStateChange('auto')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                simulatedState === 'auto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Moja kwa Moja (Sasa)
            </button>
            <button
              onClick={() => onStateChange('today')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                simulatedState === 'today'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Leo 2 Oktoba 2026
            </button>
            <button
              onClick={() => onStateChange('before')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                simulatedState === 'before'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kabla ya Tukio
            </button>
            <button
              onClick={() => onStateChange('after')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                simulatedState === 'after'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Baada ya Mahafali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

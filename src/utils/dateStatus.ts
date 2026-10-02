export type EventState = 'before' | 'today' | 'after';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export interface EventStatusResult {
  state: EventState;
  title: string;
  badgeText: string;
  subtext: string;
  countdown?: CountdownTime;
  isGraduationDay: boolean;
}

/**
 * Calculates whether today is the graduation date (2 October 2026), before, or after.
 * Takes East Africa Time (Tanzania UTC+3) into account.
 */
export function getEventStatus(
  simulatedState: 'auto' | 'before' | 'today' | 'after' = 'auto',
  targetDateStr = '2026-10-02'
): EventStatusResult {
  // If simulated via control
  if (simulatedState === 'before') {
    return {
      state: 'before',
      title: 'MAHAFALI YAMEBAKI...',
      badgeText: 'Muda Uliosalia',
      subtext: 'Maandalizi ya siku kubwa yanaendelea kwa furaha na nidhamu.',
      countdown: { days: 2, hours: 14, minutes: 30, seconds: 45, totalMs: 225045000 },
      isGraduationDay: false,
    };
  }

  if (simulatedState === 'after') {
    return {
      state: 'after',
      title: 'MAHAFALI YA KIDATO CHA NNE 2026 YAMEKAMILIKA',
      badgeText: 'Tukio Limekamilika',
      subtext: 'Tunawapongeza wahitimu wote wa Kidato cha Nne 2026 kwa safari nzuri ya masomo Tura Secondary School!',
      isGraduationDay: false,
    };
  }

  if (simulatedState === 'today') {
    return {
      state: 'today',
      title: '🎓 LEO NI SIKU YA MAHAFALI!',
      badgeText: 'Mbashara / Leo Tarehe 2 Oktoba 2026',
      subtext: 'Hongereni sana Wahitimu wa Kidato cha Nne 2026 wa Tura Secondary School!',
      isGraduationDay: true,
    };
  }

  // Automatic calculation based on current time
  const now = new Date();
  
  // Format now into East Africa Time (UTC+3) or local date YYYY-MM-DD
  // Tanzania is UTC+3
  const utcOffsetMs = now.getTimezoneOffset() * 60 * 1000;
  const eatOffsetMs = 3 * 60 * 60 * 1000;
  const eatTime = new Date(now.getTime() + utcOffsetMs + eatOffsetMs);

  const year = eatTime.getUTCFullYear();
  const month = String(eatTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(eatTime.getUTCDate()).padStart(2, '0');
  const currentDateStr = `${year}-${month}-${day}`;

  const targetDateStart = new Date(`${targetDateStr}T00:00:00+03:00`).getTime();
  const targetDateEnd = new Date(`${targetDateStr}T23:59:59+03:00`).getTime();
  const currentTimeMs = now.getTime();

  if (currentDateStr === targetDateStr || (currentTimeMs >= targetDateStart && currentTimeMs <= targetDateEnd)) {
    return {
      state: 'today',
      title: '🎓 LEO NI SIKU YA MAHAFALI!',
      badgeText: 'Mbashara / Leo Tarehe 2 Oktoba 2026',
      subtext: 'Hongereni sana Wahitimu wa Kidato cha Nne 2026 wa Tura Secondary School!',
      isGraduationDay: true,
    };
  } else if (currentTimeMs < targetDateStart) {
    const diff = targetDateStart - currentTimeMs;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      state: 'before',
      title: 'MAHAFALI YAMEBAKI...',
      badgeText: 'Muda Uliosalia',
      subtext: 'Maandalizi ya siku ya mahafali yanaendelea Tura Secondary School.',
      countdown: { days, hours, minutes, seconds, totalMs: diff },
      isGraduationDay: false,
    };
  } else {
    return {
      state: 'after',
      title: 'MAHAFALI YA KIDATO CHA NNE 2026 YAMEKAMILIKA',
      badgeText: 'Tukio Limekamilika',
      subtext: 'Tunawapongeza wahitimu wote wa Kidato cha Nne 2026 kwa safari nzuri ya masomo Tura Secondary School!',
      isGraduationDay: false,
    };
  }
}

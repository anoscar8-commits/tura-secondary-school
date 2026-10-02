/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  defaultEventInfo, 
  defaultHighlights, 
  defaultSchedule, 
  defaultPhotos, 
  defaultSchoolLifePhotos 
} from './data/defaultData';
import { PhotoItem, ScheduleItem, GraduationEventInfo } from './types';
import { getEventStatus } from './utils/dateStatus';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventStatusBanner } from './components/EventStatusBanner';
import { EventHighlights } from './components/EventHighlights';
import { AboutSection } from './components/AboutSection';
import { ScheduleSection } from './components/ScheduleSection';
import { GallerySection } from './components/GallerySection';
import { SchoolLifeGallery } from './components/SchoolLifeGallery';
import { GraduatesMessage } from './components/GraduatesMessage';
import { LightboxModal } from './components/LightboxModal';
import { AdminModal } from './components/AdminModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Footer } from './components/Footer';
import { ConfettiEffect } from './components/ConfettiEffect';

export default function App() {
  // Event Information State
  const [eventInfo, setEventInfo] = useState<GraduationEventInfo>(() => {
    const version = localStorage.getItem('tura_event_version');
    if (version === 'v3') {
      const saved = localStorage.getItem('tura_event_info');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    } else {
      localStorage.setItem('tura_event_version', 'v3');
      localStorage.setItem('tura_event_info', JSON.stringify(defaultEventInfo));
      return defaultEventInfo;
    }
    return defaultEventInfo;
  });

  // Schedule Items State
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('tura_schedule');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultSchedule;
  });

  // Graduation Photos State
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const version = localStorage.getItem('tura_photos_version');
    if (version === 'v4') {
      const saved = localStorage.getItem('tura_photos');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
      }
    } else {
      localStorage.setItem('tura_photos_version', 'v4');
      localStorage.setItem('tura_photos', JSON.stringify(defaultPhotos));
      return defaultPhotos;
    }
    return defaultPhotos;
  });

  // Simulator state: 'auto' | 'before' | 'today' | 'after'
  const [simulatedState, setSimulatedState] = useState<'auto' | 'before' | 'today' | 'after'>('auto');

  // Modals & Popups
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [confettiActive, setConfettiActive] = useState(false);

  // Status calculation
  const eventStatus = getEventStatus(simulatedState);
  const isToday = eventStatus.isGraduationDay;

  // Persist edits to localStorage
  useEffect(() => {
    localStorage.setItem('tura_event_info', JSON.stringify(eventInfo));
  }, [eventInfo]);

  useEffect(() => {
    localStorage.setItem('tura_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    // Only save up to 40 photos to prevent exceeding localStorage quota
    try {
      localStorage.setItem('tura_photos', JSON.stringify(photos.slice(0, 40)));
    } catch (e) {
      console.warn('LocalStorage limit reached for photo cache:', e);
    }
  }, [photos]);

  // Trigger celebration on load if today is graduation day
  useEffect(() => {
    if (isToday) {
      setConfettiActive(true);
      const timer = setTimeout(() => setConfettiActive(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isToday]);

  const triggerConfettiManual = () => {
    setConfettiActive(false);
    setTimeout(() => setConfettiActive(true), 50);
  };

  // Lightbox Navigation
  const currentPhotoIndex = selectedPhoto
    ? photos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;
  const hasPrev = currentPhotoIndex > 0;
  const hasNext = currentPhotoIndex !== -1 && currentPhotoIndex < photos.length - 1;

  const handlePrevPhoto = () => {
    if (hasPrev) {
      setSelectedPhoto(photos[currentPhotoIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (hasNext) {
      setSelectedPhoto(photos[currentPhotoIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white relative">
      {/* Festive Confetti Animation */}
      <ConfettiEffect
        active={confettiActive}
        onFinish={() => setConfettiActive(false)}
      />

      {/* Sticky Header & Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        isToday={isToday}
      />

      {/* Hero Section */}
      <Hero
        eventInfo={eventInfo}
        isToday={isToday}
        onTriggerConfetti={triggerConfettiManual}
      />

      {/* Live Event Status / Countdown Banner */}
      <EventStatusBanner
        simulatedState={simulatedState}
        onStateChange={setSimulatedState}
        onCelebrate={triggerConfettiManual}
      />

      {/* Event Highlights (5 Cards) */}
      <EventHighlights highlights={defaultHighlights} />

      {/* About Section */}
      <AboutSection eventInfo={eventInfo} />

      {/* Graduation Program / Ratiba */}
      <ScheduleSection
        schedule={schedule}
        onOpenEditSchedule={() => {
          setIsAdminOpen(true);
        }}
      />

      {/* Graduation Photo Gallery with Lightbox & Upload */}
      <GallerySection
        photos={photos}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        onOpenUpload={() => setIsAdminOpen(true)}
      />

      {/* Message to Graduates (6 Pillars) */}
      <GraduatesMessage />

      {/* School Life Gallery */}
      <SchoolLifeGallery
        photos={defaultSchoolLifePhotos}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Footer */}
      <Footer
        eventInfo={eventInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentIndex={currentPhotoIndex}
        totalCount={photos.length}
      />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        photos={photos}
        onUpdatePhotos={setPhotos}
        schedule={schedule}
        onUpdateSchedule={setSchedule}
        eventInfo={eventInfo}
        onUpdateEventInfo={setEventInfo}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Deployment & Help Guide Modal */}
      <DeploymentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

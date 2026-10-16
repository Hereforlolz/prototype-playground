// components/Slideshow.js
//
// Auto-advancing photo slideshow. Pauses on hover and keyboard focus, has a
// pause/play button and previous/next buttons, and does not auto-advance for
// visitors who prefer reduced motion.
import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';

const INTERVAL_MS = 5000;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export default function Slideshow({ photos, label }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const count = photos.length;

  const playing = !paused && !hovering && !focused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setIndex(i => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing, count]);

  const go = delta => setIndex(i => (i + delta + count) % count);
  const photo = photos[index];
  const btn =
    'px-3 py-1 rounded-md border border-border text-text text-sm hover:border-accent hover:text-accent transition-colors duration-150';

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="mt-6"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative w-full aspect-[4/3] rounded-md border border-border bg-surface-alt overflow-hidden">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 672px) 640px, 100vw"
          className="object-contain"
        />
      </div>
      <p className="text-muted text-xs mt-2" aria-live={playing ? 'off' : 'polite'}>
        {photo.caption} ({index + 1} of {count})
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous photo">←</button>
        <button type="button" className={btn} onClick={() => go(1)} aria-label="Next photo">→</button>
        {!reducedMotion && count > 1 && (
          <button type="button" className={btn} onClick={() => setPaused(p => !p)}>
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>
    </section>
  );
}

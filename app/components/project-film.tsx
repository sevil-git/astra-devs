"use client";

import { useEffect, useRef, useState } from "react";

type ProjectFilmProps = {
  name: string;
  film: string;
  poster: string;
  url: string;
  mirror: boolean;
};

export default function ProjectFilm({ name, film, poster, url, mirror }: ProjectFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const updatePlayback = useRef<() => void>(() => {});
  const userPaused = useRef(false);
  const manualMotion = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (mirror || !video || !frame) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    let disposed = false;
    let shouldPlay = false;
    const load = () => {
      if (!video.getAttribute("src")) {
        video.src = film;
        video.load();
      }
    };
    const sync = () => {
      const allowed = visible && !document.hidden && !userPaused.current &&
        (manualMotion.current || (!motion.matches && !connection?.saveData));
      shouldPlay = allowed;
      if (!allowed) {
        video.pause();
        return;
      }
      load();
      video.play().then(() => {
        if (disposed || !shouldPlay) video.pause();
      }).catch(() => { /* The poster and play button remain available if autoplay is blocked. */ });
    };
    updatePlayback.current = sync;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
      sync();
    }, { threshold: [0, 0.3, 0.7] });
    observer.observe(frame);
    const motionChange = () => { manualMotion.current = false; sync(); };
    motion.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      shouldPlay = false;
      video.pause();
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", sync);
      updatePlayback.current = () => {};
    };
  }, [film, mirror]);

  return (
    <>
      <figure className="project-screen project-film" ref={frameRef} data-film-ready={ready && !failed}>
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${name} live website (opens in a new tab)`}>
          <img src={poster} alt={`${name} desktop experience preview`} width="1920" height="1080" loading="lazy" decoding="async" />
          {!mirror && <video ref={videoRef} width="1920" height="1080" muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true"
            onPlaying={() => { setPlaying(true); setReady(true); }}
            onPause={() => setPlaying(false)}
            onError={() => { setFailed(true); setPlaying(false); }}
          />}
        </a>
      </figure>
      {!mirror && !failed && <button type="button" className="project-film-control" data-mask="hide"
        aria-label={`${playing ? "Pause" : "Play"} ${name} project film`}
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          if (!video.paused) { userPaused.current = true; video.pause(); }
          else { userPaused.current = false; manualMotion.current = true; updatePlayback.current(); }
        }}>
        {playing ? <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M1 1h3v12H1zM8 1h3v12H8z" /></svg> : <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="m2 1 9 6-9 6z" /></svg>}
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>}
    </>
  );
}

"use client";

import { useRef, useEffect } from "react";

export default function LogistikHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setSpeed = () => {
      video.playbackRate = 0.75;
    };

    if (video.readyState >= 2) {
      setSpeed();
    } else {
      video.addEventListener("loadedmetadata", setSpeed);
      video.addEventListener("canplay", setSpeed);
      return () => {
        video.removeEventListener("loadedmetadata", setSpeed);
        video.removeEventListener("canplay", setSpeed);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src="/video/logistik.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}

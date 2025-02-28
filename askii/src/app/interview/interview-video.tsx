import React, { useRef, useEffect } from "react";

function InterviewVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.error("Autoplay blocked:", err));
      }
    }
  }, [src]);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; 
      videoRef.current.play();
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      autoPlay 
      playsInline 
      onEnded={handleEnded}
      className="rounded-md h-full w-full object-cover"
    />
  );
}

export default InterviewVideo;

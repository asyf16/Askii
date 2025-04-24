import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface InterviewVideoHandle {
  pause: () => void;
  play: () => void;
}

const InterviewVideo = forwardRef<InterviewVideoHandle, { src: string }>(
  ({ src }, ref) => {
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

  useImperativeHandle(ref, () => ({
    pause: () => {
      videoRef.current?.pause();
    },
    play: () => {
      videoRef.current?.play();
    },
  }));
  
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
})

export default InterviewVideo;

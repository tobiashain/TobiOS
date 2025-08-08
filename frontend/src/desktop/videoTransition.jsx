import { useEffect, useRef, useState } from "react";

export default function VideoTransition({ onFinish }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    visibleRef.current = true;
    setVisible(true);
    video.play();

    const handleEnd = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const handleTransitionEnd = (e) => {
      if (e.propertyName !== "opacity") return;

      if (!visibleRef.current) {
        onFinish?.();
      }
    };

    video.addEventListener("ended", handleEnd);
    video.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
      video.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [onFinish]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      loop={false}
      className={`transition-video ${visible ? "visible" : ""}`}
    >
      <source src="lain.mp4" type="video/mp4" />
    </video>
  );
}

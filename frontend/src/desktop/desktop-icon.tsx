import { useWindowManager } from "../shared/WindowManagerContext";
import { useState } from "react";
import VideoTransition from "./videoTransition";
import { DesktopIcons } from "./desktopIcons";

export default function DesktopIcon(props: DesktopIcons) {
  const { id, icon, type, label, link, children, size } = props;
  const { openWindow } = useWindowManager();
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      <div
        className="desktop-icons"
        onClick={() => {
          if (type === "link" && link) {
            open(link, "_blank");
          } else if (type === "wired") {
            setShowVideo(true);
          } else {
            openWindow(props);
          }
        }}
      >
        <div className="desktop-icons__icon">
          <img src={icon} alt={label} />
        </div>
        <div className="desktop-icons__label">{label}</div>
      </div>

      {showVideo && <VideoTransition onFinish={() => setShowVideo(false)} />}
    </>
  );
}

import "./desktop.scss";
import DesktopIcon from "./desktop-icon";
import Window from "./window";
import { useState } from "react";
import { desktopIcons } from "./desktopIcons";

export default function Desktop() {
  const icons = [];
  const [windows, setWindows] = useState([]);

  const openWindow = (id, icon, type, label) => {
    if (!windows.some((item) => item.windowId === id)) {
      setWindows((prevWindows) => [
        ...prevWindows,
        { id: Date.now(), windowId: id, label, type, icon },
      ]);
    }
  };
  const closeWindow = (windowId) => {
    setWindows((prevWindows) =>
      prevWindows.filter((window) => window.windowId !== windowId)
    );
  };
  return (
    <>
      <div className="desktop">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            type={icon.type}
            onClick={openWindow}
            link={icon.link}
          />
        ))}
        {windows.map((window) => (
          <Window
            key={window.id}
            windowId={window.windowId}
            label={window.label}
            icon={window.icon}
            type={window.type}
            closeWindow={closeWindow}
          />
        ))}
      </div>
    </>
  );
}

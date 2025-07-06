import "./desktop.scss";
import DesktopIcon from "./desktop-icon";
import Window from "../window/window";
import { desktopIcons } from "./desktopIcons";
import { useWindowManager } from "../shared/WindowManagerContext";
import { useEffect } from "react";
import preloadVideo from "../shared/preload";

export default function Desktop() {
  const { windows, windowRefs } = useWindowManager();

  useEffect(() => {
    preloadVideo("lain.mp4");
  }, []);
  return (
    <>
      <div className="desktop">
        {
          // .map is a foreach that returns a new array and uses a callback function
          // in this case an array filled with DesktopIcon
        }
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            type={icon.type}
            link={icon.link}
            children={icon.children}
            size={icon.size}
          />
        ))}
        {windows.map((window) => (
          <Window
            key={window.windowId}
            // Ref callback invoked by React on mount/unmount to keep windowRefs.current synced with the actual DOM elements
            ref={(el) => {
              if (el) windowRefs.current[window.windowId] = el;
              else delete windowRefs.current[window.windowId];
            }}
            windowId={window.windowId}
            label={window.label}
            icon={window.icon}
            type={window.type}
            children={window.children}
            link={window.link}
            size={window.size}
          />
        ))}
      </div>
    </>
  );
}

import "./desktop.scss";
import DesktopIcon from "./desktop-icon";
import Window from "./window";
import { desktopIcons } from "./desktopIcons";
import { useWindowManager } from "./WindowManagerContext";

export default function Desktop() {
  const { openWindow, closeWindow, windows, windowRefs } = useWindowManager();
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
            onClick={openWindow}
            link={icon.link}
            children={icon.children}
          />
        ))}
        {windows.map((window) => (
          <Window
            key={window.id}
            ref={(el) => {
              if (el) windowRefs.current[window.windowId] = el;
              else delete windowRefs.current[window.windowId];
            }}
            windowId={window.windowId}
            label={window.label}
            icon={window.icon}
            type={window.type}
            closeWindow={closeWindow}
            children={window.children}
          />
        ))}
      </div>
    </>
  );
}

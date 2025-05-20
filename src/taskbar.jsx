import "./taskbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { useWindowManager } from "./WindowManagerContext";
import TaskbarItem from "./taskbar-item";

export default function Taskbar() {
  const { windows, windowRefs } = useWindowManager();

  function onTaskbarItemClick(windowId) {
    const el = windowRefs.current[windowId];
    el.style.visibility =
      el.style.visibility === "hidden" ? "visible" : "hidden";
  }
  return (
    <>
      <div className="taskbar">
        <div className="osButton">
          <FontAwesomeIcon icon={faWindows} size="2x" />
        </div>
        <div className="tabs">
          {windows.map((window) => (
            <TaskbarItem
              key={window.id}
              windowId={window.windowId}
              label={window.label}
              icon={window.icon}
              onClick={onTaskbarItemClick}
            />
          ))}
        </div>
        <div className="settings"></div>
      </div>
    </>
  );
}

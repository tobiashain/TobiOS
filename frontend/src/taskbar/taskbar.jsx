import "./taskbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { useWindowManager } from "../shared/WindowManagerContext";
import TaskbarItem from "./taskbar-item";
import { useState, useEffect } from "react";

export default function Taskbar() {
  const { windows } = useWindowManager();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
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
            />
          ))}
        </div>
        <div className="settings">
          <div className="site">Site A</div>
          <div className="time">{time.toLocaleString()}</div>
        </div>
      </div>
    </>
  );
}

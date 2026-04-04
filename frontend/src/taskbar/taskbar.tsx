import "./taskbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { useWindowManager } from "../shared/WindowManagerContext";
import TaskbarItem from "./taskbar-item";
import { useState, useEffect } from "react";

export default function Taskbar() {
  const { windows } = useWindowManager();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId: number = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <div className="taskbar">
        <div className="taskbar-os-button">
          <FontAwesomeIcon icon={faWindows} size="2x" />
        </div>
        <div className="taskbar__tabs">
          {windows.map((window) => (
            <TaskbarItem
              key={window.id}
              windowId={window.windowId}
              label={window.label}
              icon={window.icon}
            />
          ))}
        </div>
        <div className="taskbar-settings">
          <div className="taskbar-settings__site">Site A</div>
          <div className="taskbar-settings__time">
            {time.toLocaleString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
      </div>
    </>
  );
}

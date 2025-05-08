import "./desktop.scss";
import DesktopIcon from "./desktop-icon";
import Window from "./window";
import { useState } from "react";
import { desktopIcons } from "./desktopIcons";
import { useWindowManager } from "./WindowManagerContext";

export default function Desktop() {
  const { openWindow, closeWindow, windows } = useWindowManager();
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
            children={icon.children}
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
            children={window.children}
          />
        ))}
      </div>
    </>
  );
}

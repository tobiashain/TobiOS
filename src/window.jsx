import "./window.scss";
import interact from "interactjs";
import React from "react";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons/faRectangleXmark";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import DesktopIcon from "./desktop-icon";
import { useWindowManager } from "./WindowManagerContext";

const Window = React.forwardRef(function Window(props, ref) {
  const { windowId, label, icon, type, closeWindow, children } = props;
  const position = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);
  const [startPositon, setStartPositon] = useState({ top: 0, left: 0 });
  const startPositionRef = useRef({ top: 0, left: 0 });
  const { openWindow } = useWindowManager();

  useEffect(() => {
    startPositionRef.current = startPositon;
  }, [startPositon]);

  useEffect(() => {
    if (!windowRef.current) return;

    interact(windowRef.current).draggable({
      listeners: {
        move(event) {
          const pos = position.current;

          pos.x += event.dx;
          pos.y += event.dy;

          const { top, left } = startPositionRef.current;
          const maxX = window.innerWidth - 540 - left;
          const maxY =
            window.innerHeight - 540 - window.innerHeight * 0.05 - top;
          pos.x = Math.max(-left, Math.min(pos.x, maxX));
          pos.y = Math.max(-top, Math.min(pos.y, maxY));

          event.target.parentNode.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        },
      },
    });
  }, []);

  useLayoutEffect(() => {
    const left = Math.floor(Math.random() * (window.innerWidth - 540));
    const top = Math.floor(
      Math.random() * (window.innerHeight - 540 - window.innerHeight * 0.05)
    );
    setStartPositon({ top: top, left: left });
  }, []);

  function handleClose() {
    closeWindow(windowId);
  }

  return (
    <>
      <div
        className="window"
        ref={ref}
        style={{ top: startPositon.top, left: startPositon.left }}
      >
        <div className={`window-header window-${windowId}`} ref={windowRef}>
          <div className="window-header-image">
            <img src={icon} />
          </div>
          <div className="window-header-title">{label}</div>
          <div className="window-header-buttons">
            <div className="window-header-button">
              <FontAwesomeIcon icon={faWindowMinimize} size="lg" />
            </div>
            <div className="window-header-button">
              <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
            </div>
            <div
              className="window-header-button"
              onClick={() => {
                handleClose();
              }}
            >
              <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
            </div>
          </div>
        </div>
        {type === "folder" ? (
          <>
            <div className="window-action-buttons">
              <div className="">File</div>
              <div className="">Edit</div>
              <div className="">View</div>
              <div className="">Go</div>
              <div className="">Favourites</div>
              <div className="">Help</div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="window-content">
          {type === "folder" ? (
            <>
              {children.map((child) => (
                <DesktopIcon
                  key={child.id}
                  id={child.id}
                  icon={child.icon}
                  label={child.label}
                  type={child.type}
                  link={child.link}
                  onClick={openWindow}
                  children={child.children}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
});

export default Window;

import "./window.scss";
import { renderByType } from "./renderMap";
import interact from "interactjs";
import React from "react";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons/faRectangleXmark";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import DesktopIcon from "./desktop-icon";
import { useWindowManager } from "./WindowManagerContext";

const Window = React.forwardRef(function Window(
  { windowId, label, icon, type, children, link },
  ref
) {
  const position = useRef({ x: 0, y: 0 });
  const windowDragRef = useRef(null);
  const [startPositon, setStartPositon] = useState({ top: 0, left: 0 });
  const startPositionRef = useRef({ top: 0, left: 0 });
  const { closeWindow, windowRefs, highestZindex, setHighestZindex } =
    useWindowManager();

  useEffect(() => {
    startPositionRef.current = startPositon;
  }, [startPositon]);

  useEffect(() => {
    if (!windowRefs.current[windowId]) return;

    interact(windowRefs.current[windowId]).resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move: function (event) {
          let { x, y } = position.current;

          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          position.current.x = x;
          position.current.y = y;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
        },
      },
    });
    interact(
      windowRefs.current[windowId].querySelector(`.window-header`)
    ).draggable({
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

  return (
    <>
      <div
        className={`window window-${windowId}`}
        ref={ref}
        style={{ top: startPositon.top, left: startPositon.left }}
        onClick={() => {
          const currentZIndex =
            Number(windowRefs.current[windowId].style.zIndex) || 0;

          if (currentZIndex !== highestZindex) {
            const newZIndex = highestZindex + 1;
            setHighestZindex(newZIndex);
            windowRefs.current[windowId].style.zIndex = newZIndex;
          }
        }}
      >
        <div className="window-header">
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
                closeWindow(windowId);
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
          {renderByType[type]?.({ children, link })}
        </div>
      </div>
    </>
  );
});
export default Window;

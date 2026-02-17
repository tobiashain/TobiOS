import "./window.scss";
import { renderByType, WindowType } from "./renderMap";
import interact from "interactjs";
import React from "react";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons/faRectangleXmark";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { useWindowManager } from "../shared/WindowManagerContext";
import { DesktopIcons } from "../desktop/desktopIcons";

interface WindowProps {
  windowId: string;
  label: string;
  icon: string;
  type: string;
  children?: DesktopIcons[];
  link?: string;
  size?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const Window = React.forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
  const { windowId, label, icon, type, children, link, size } = props;
  const position = useRef({ x: 0, y: 0 });
  const [startPositon, setStartPositon] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 500, height: 500 });
  const startPositionRef = useRef({ top: 0, left: 0 });
  const { closeWindow, windowRefs, highestZindex, setHighestZindex } =
    useWindowManager();

  const disableIframes = () => {
    const node = windowRefs.current[windowId];
    if (!node) return;

    node.querySelectorAll("iframe").forEach((iframe) => {
      (iframe as HTMLIFrameElement).style.pointerEvents = "none";
    });
  };

  const enableIframes = () => {
    const node = windowRefs.current[windowId];
    if (!node) return;

    node.querySelectorAll("iframe").forEach((iframe) => {
      (iframe as HTMLIFrameElement).style.pointerEvents = "auto";
    });
  };

  useEffect(() => {
    startPositionRef.current = startPositon;
  }, [startPositon]);

  //useEffect runs after the browser painted the DOM
  useEffect(() => {
    if (!windowRefs.current[windowId]) return;

    const windowHeader = windowRefs.current[windowId].querySelector(
      `.window-header`,
    ) as HTMLDivElement;

    if (!windowHeader) return;

    interact(windowRefs.current[windowId]).resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      margin: 10,
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 300, height: 300 },
        }),
      ],
      listeners: {
        start() {
          disableIframes();
        },

        move: function (event) {
          let { x, y } = position.current;

          x = (x || 0) + event.deltaRect.left;
          y = (y || 0) + event.deltaRect.top;

          position.current.x = x;
          position.current.y = y;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
          setWindowSize({
            width: event.rect.width,
            height: event.rect.height,
          });
        },

        end() {
          enableIframes();
        },
      },
    });
    interact(windowHeader).draggable({
      listeners: {
        start() {
          disableIframes();
        },

        move(event) {
          const pos = position.current;

          pos.x += event.dx;
          pos.y += event.dy;

          const { top, left } = startPositionRef.current;
          /*const maxX = window.innerWidth - windowSize.width - 40 - left;
          const maxY =
            window.innerHeight -
            windowSize.height -
            40 -
            window.innerHeight * 0.05 -
            top;
          pos.x = Math.max(-left, Math.min(pos.x, maxX));
          pos.y = Math.max(-top, Math.min(pos.y, maxY));
          */

          const maxX = window.innerWidth - windowSize.width - left;
          const maxY =
            window.innerHeight -
            windowSize.height -
            window.innerHeight * 0.05 -
            top;
          pos.x = Math.max(-left, Math.min(pos.x, maxX));
          pos.y = Math.max(-top, Math.min(pos.y, maxY));

          event.target.parentNode.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        },

        end() {
          enableIframes();
        },
      },
    });
  }, [startPositon, windowSize]); //rerender because of usestate is "async"

  //useLayoutEffects runs immediately after the DOM mutations but before the browser paints
  useLayoutEffect(() => {
    //setStates do not not update the value of the state variable in the current render, only in the next cycle.
    let localWindowSize = [windowSize.width, windowSize.height];
    if (size) {
      const tempSize = size.split("x");
      setWindowSize({
        width: Number(tempSize[0]),
        height: Number(tempSize[1]),
      });
    }
    /*
    const left = Math.floor(
      Math.random() * (window.innerWidth - localWindowSize[0] - 40),
    );
    const top = Math.floor(
      Math.random() *
        (window.innerHeight -
          localWindowSize[1] -
          40 -
          window.innerHeight * 0.05),
    );
    */
    const left = Math.floor(
      Math.random() * (window.innerWidth - localWindowSize[0]),
    );
    const top = Math.floor(
      Math.random() *
        (window.innerHeight - localWindowSize[1] - window.innerHeight * 0.05),
    );
    setStartPositon({ top: top, left: left });
  }, []);

  return (
    <>
      <div
        className={`window window-${windowId}`}
        ref={ref}
        style={{
          top: startPositon.top,
          left: startPositon.left,
          width: windowSize.width,
          height: windowSize.height,
        }}
        onClick={() => {
          if (!windowRefs.current[windowId]) return;

          const currentZIndex =
            Number(windowRefs.current[windowId].style.zIndex) || 0;

          if (currentZIndex !== highestZindex) {
            const newZIndex = highestZindex + 1;
            setHighestZindex(newZIndex);
            windowRefs.current[windowId].style.zIndex = newZIndex.toString();
          }
        }}
      >
        {/* needed so that you can resize on the right side of scrollbar */}
        <div className="resize-handle resize-handle-right"></div>
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
          {renderByType[type as WindowType]?.({ children, link })}
        </div>
      </div>
    </>
  );
});
export default Window;

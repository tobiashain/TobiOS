import "./window.scss";
import { renderByType, WindowType } from "./renderMap";
import interact from "interactjs";
import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  Fragment,
} from "react";
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
  size?: string; // "500x800" | "fullscreen"
}

const TASKBAR_RATIO = 0.05;

const Window = React.forwardRef<HTMLDivElement, WindowProps>((props, ref) => {
  const { windowId, label, icon, type, children, link, size } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const position = useRef({ x: 0, y: 0 });

  const { closeWindow, updateZIndex, windowRefs } = useWindowManager();

  const isFullscreen = size === "fullscreen";

  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500,
  });

  const getTaskbarHeight = () => window.innerHeight * TASKBAR_RATIO;

  const clampToViewport = (node: HTMLElement, x: number, y: number) => {
    node.style.transform = `translate(${x}px, ${y}px)`;

    const rect = node.getBoundingClientRect();
    const bottomLimit = window.innerHeight - getTaskbarHeight();

    let newX = x;
    let newY = y;

    if (rect.left < 0) newX += -rect.left;
    if (rect.right > window.innerWidth) newX -= rect.right - window.innerWidth;
    if (rect.top < 0) newY += -rect.top;
    if (rect.bottom > bottomLimit) newY -= rect.bottom - bottomLimit;

    return { x: newX, y: newY };
  };

  const disableIframes = () => {
    document.querySelectorAll("iframe").forEach((iframe) => {
      (iframe as HTMLIFrameElement).style.pointerEvents = "none";
    });
  };

  const enableIframes = () => {
    document.querySelectorAll("iframe").forEach((iframe) => {
      (iframe as HTMLIFrameElement).style.pointerEvents = "auto";
    });
  };

  useLayoutEffect(() => {
    if (!nodeRef.current) return;

    if (isFullscreen) {
      const height = window.innerHeight - getTaskbarHeight();
      const width = window.innerWidth;

      setWindowSize({ width, height });

      position.current = { x: -50, y: -50 };

      Object.assign(nodeRef.current.style, {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(-50px, -50px)`,
      });

      return;
    }

    let width = 500;
    let height = 500;

    if (size && size.includes("x")) {
      const [w, h] = size.split("x");
      width = Number(w);
      height = Number(h);
    }

    setWindowSize({ width, height });

    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height - getTaskbarHeight();

    const x = Math.floor(Math.random() * Math.max(0, maxX));
    const y = Math.floor(Math.random() * Math.max(0, maxY));

    position.current = { x, y };

    nodeRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, [size]);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) updateZIndex(node);

    if (!node || isFullscreen) return;

    const header = node.querySelector(".window-header") as HTMLDivElement;

    if (!header) return;

    const draggable = interact(header).draggable({
      listeners: {
        start() {
          disableIframes();
        },
        move(event) {
          let { x, y } = position.current;

          x += event.dx;
          y += event.dy;

          const clamped = clampToViewport(node, x, y);

          position.current = clamped;
          node.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
        },
        end() {
          enableIframes();
        },
      },
    });

    const resizable = interact(node).resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      margin: 10,
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: "parent",
        }),
        interact.modifiers.restrictSize({
          min: { width: 300, height: 300 },
        }),
      ],
      listeners: {
        start() {
          disableIframes();
        },
        move(event) {
          let { x, y } = position.current;

          // adjust position only for left/top resizing
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          position.current = { x, y };

          node.style.width = `${event.rect.width}px`;
          node.style.height = `${event.rect.height}px`;
          node.style.transform = `translate(${x}px, ${y}px)`;
        },
        end(event) {
          enableIframes();

          // update React state only once
          setWindowSize({
            width: event.rect.width,
            height: event.rect.height,
          });
        },
      },
    });

    return () => {
      draggable.unset();
      resizable.unset();
    };
  }, [isFullscreen]);

  return (
    <div
      className={`window window-${windowId}`}
      ref={(el) => {
        nodeRef.current = el;

        if (typeof ref === "function") ref(el);
        else if (ref) (ref as any).current = el;

        if (el) windowRefs.current[windowId] = el;
      }}
      style={{
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
      }}
      onMouseDown={() => {
        const node = nodeRef.current;
        if (node) updateZIndex(node);
      }}
    >
      {!isFullscreen && (
        <Fragment>
          <div className="resize-handle resize-handle-right"></div>
          <div className="resize-handle resize-handle-left"></div>
          <div className="resize-handle resize-handle-bottom"></div>
          <div className="resize-handle resize-handle-top"></div>
        </Fragment>
      )}

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
            onClick={() => closeWindow(windowId)}
          >
            <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
          </div>
        </div>
      </div>

      {type === "folder" && (
        <div className="window-action-buttons">
          <div>File</div>
          <div>Edit</div>
          <div>View</div>
          <div>Go</div>
          <div>Favourites</div>
          <div>Help</div>
        </div>
      )}

      <div className="window-content">
        {renderByType[type as WindowType]?.({ children, link, windowId })}
      </div>
    </div>
  );
});

export default Window;

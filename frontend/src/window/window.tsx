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
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
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

  const [isMaximized, setIsMaximized] = useState(size === "fullscreen");

  const [prevSize, setPrevSize] = useState({ width: 500, height: 500 });
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500,
  });

  const [iframeOverlayActive, setIframeOverlayActive] = useState(true);

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

  // Initialize size/position based on size prop and isMaximized
  useLayoutEffect(() => {
    if (!nodeRef.current) return;

    if (isMaximized) {
      const height = window.innerHeight - getTaskbarHeight();
      const width = window.innerWidth;

      setWindowSize({ width, height });
      position.current = { x: 0, y: 0 };

      Object.assign(nodeRef.current.style, {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(0px, 0px)`,
      });
      return;
    }

    // Not maximized – use size prop or default
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
  }, [isMaximized, size]);

  // Setup draggable/resizable (only when not maximized)
  useEffect(() => {
    const node = nodeRef.current;
    if (node) updateZIndex(node);

    if (!node || isMaximized) return;

    const header = node.querySelector(".window__header") as HTMLDivElement;
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

          x += event.deltaRect.left;
          y += event.deltaRect.top;

          position.current = { x, y };

          node.style.width = `${event.rect.width}px`;
          node.style.height = `${event.rect.height}px`;
          node.style.transform = `translate(${x}px, ${y}px)`;
        },
        end(event) {
          enableIframes();

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
  }, [isMaximized]);

  useEffect(() => {
    const handleGlobalMouseDown = (e: MouseEvent) => {
      const node = nodeRef.current;
      if (node && !node.contains(e.target as Node)) {
        setIframeOverlayActive(true);
      }
    };

    document.addEventListener("mousedown", handleGlobalMouseDown);
    return () =>
      document.removeEventListener("mousedown", handleGlobalMouseDown);
  }, []);

  const minimizeWindow = () => {
    const node = nodeRef.current;
    if (node) {
      node.style.visibility = "hidden";
    }
  };

  const toggleMaximize = () => {
    if (size === "fullscreen") return;

    const node = nodeRef.current;
    if (!node) return;

    if (!isMaximized) {
      // Store current size and position before maximizing
      const rect = node.getBoundingClientRect();
      setPrevSize({ width: rect.width, height: rect.height });
      setPrevPos({ x: position.current.x, y: position.current.y });

      // Set to fullscreen
      const width = window.innerWidth;
      const height = window.innerHeight - getTaskbarHeight();
      setWindowSize({ width, height });
      position.current = { x: 0, y: 0 };
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      node.style.transform = `translate(0px, 0px)`;
      setIsMaximized(true);
    } else {
      // Restore previous size and position
      setWindowSize(prevSize);
      position.current = prevPos;
      node.style.width = `${prevSize.width}px`;
      node.style.height = `${prevSize.height}px`;
      node.style.transform = `translate(${prevPos.x}px, ${prevPos.y}px)`;
      setIsMaximized(false);
    }

    updateZIndex(node);
  };

  return (
    <div
      className={`window window--${windowId}`}
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
      {/* Resize handles – only when not maximized */}
      {!isMaximized && (
        <Fragment>
          <div className="window__resize-handle window__resize-handle--right"></div>
          <div className="window__resize-handle window__resize-handle--left"></div>
          <div className="window__resize-handle window__resize-handle--bottom"></div>
          <div className="window__resize-handle window__resize-handle--top"></div>
        </Fragment>
      )}

      <div className="window__header">
        <div className="window__image">
          <img src={icon} alt="" />
        </div>

        <div className="window__title">{label}</div>

        <div className="window__buttons">
          <div className="window__button" onClick={minimizeWindow}>
            <FontAwesomeIcon icon={faWindowMinimize} size="lg" />
          </div>
          <div
            className={`window__button ${size === "fullscreen" ? "window__button--disabled" : ""}`}
            onClick={size === "fullscreen" ? undefined : toggleMaximize}
            style={{
              cursor: size === "fullscreen" ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={isMaximized ? faWindowRestore : faWindowMaximize}
              size="lg"
            />
          </div>
          <div className="window__button" onClick={() => closeWindow(windowId)}>
            <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
          </div>
        </div>
      </div>

      {type === "folder" && (
        <div className="window__action-buttons">
          <div>File</div>
          <div>Edit</div>
          <div>View</div>
          <div>Go</div>
          <div>Favourites</div>
          <div>Help</div>
        </div>
      )}

      <div className="window__content">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {renderByType[type as WindowType]?.({ children, link, windowId })}

          {iframeOverlayActive && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                cursor: "default",
              }}
              onMouseDown={() => {
                const node = nodeRef.current;
                if (node) updateZIndex(node);
                setIframeOverlayActive(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default Window;

import "./window.scss";
import interact from "interactjs";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons/faRectangleXmark";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";

export default function Window({ id, text, type, image }) {
  const position = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (!windowRef.current) return;

    interact(windowRef.current).draggable({
      listeners: {
        move(event) {
          const pos = position.current;
          pos.x += event.dx;
          pos.y += event.dy;

          //-590 because of window of 500 + screen padding of 20 + desktop padding of 50
          const maxX = window.innerWidth - 590;
          const maxY = window.innerHeight - 590 - window.innerHeight * 0.05;
          pos.x = Math.max(-50, Math.min(pos.x, maxX));
          pos.y = Math.max(-50, Math.min(pos.y, maxY));

          event.target.parentNode.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        },
      },
    });
  }, []);
  return (
    <>
      <div className="window">
        <div className={`window-header window-${id}`} ref={windowRef}>
          <div className="window-header-image">
            <img src={image} />
          </div>
          <div className="window-header-title">{text}</div>
          <div className="window-header-buttons">
            <div className="window-header-button">
              <FontAwesomeIcon icon={faWindowMinimize} size="lg" />
            </div>
            <div className="window-header-button">
              <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
            </div>
            <div className="window-header-button">
              <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
            </div>
          </div>
        </div>
        {type === "browser" ? (
          <>
            <div className="window-action-buttons"></div>
          </>
        ) : (
          <></>
        )}
        <div className="window-content"></div>
      </div>
    </>
  );
}

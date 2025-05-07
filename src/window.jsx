import "./window.scss";
import interact from "interactjs";

export default function Window({ name, image, type }) {
  const position = { x: 0, y: 0 };
  interact(".window-header").draggable({
    listeners: {
      start(event) {},
      move(event) {
        if (position.x > window.screen.width - 500) {
          position.x = window.screen.width - 500;
        } else {
          position.x += event.dx;
        }

        if (position.y > window.screen.height) {
          position.y = window.screen.height;
        } else {
          position.y += event.dy;
        }

        event.target.parentNode.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
  return (
    <>
      <div className="window">
        <div className="window-header">
          <div className="window-header-image">{image}</div>
          <div className="window-header-title">{name}</div>
          <div className="window-header-buttons">
            <div className="window-header-button"></div>
            <div className="window-header-button"></div>
            <div className="window-header-button"></div>
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

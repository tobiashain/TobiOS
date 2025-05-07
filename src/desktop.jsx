import "./desktop.scss";
import DesktopIcon from "./desktop-icon";
import Window from "./window";
import { useState } from "react";

export default function Desktop() {
  const icons = [];
  const [windows, setWindows] = useState([]);

  const openWindow = (id) => {
    setWindows((prevWindows) => [...prevWindows, id]);
  };
  for (let i = 0; i < 112; i++) {
    icons.push(
      <DesktopIcon
        id={i}
        key={i}
        image="https://picsum.photos/60/60"
        type="file"
        text="My Document"
        onClick={openWindow}
      />
    );
  }
  return (
    <>
      <div className="desktop">
        {icons}
        {windows.map((window) => (
          <Window key={window.id} id={window.id} />
        ))}
      </div>
    </>
  );
}

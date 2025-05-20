import { useWindowManager } from "./WindowManagerContext";

export default function DesktopIcon({ id, icon, type, label, link, children }) {
  const { openWindow } = useWindowManager();
  return (
    <>
      <div
        className="desktop-icon"
        onClick={() => {
          if (type === "link" && link) {
            open(link, "_blank");
          } else {
            openWindow(id, icon, type, label, children, link);
          }
        }}
      >
        <div className="icon">
          <img src={icon} />
        </div>
        <div className="label">{label}</div>
      </div>
    </>
  );
}

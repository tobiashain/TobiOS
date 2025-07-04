import { useWindowManager } from "../shared/WindowManagerContext";

export default function DesktopIcon({
  id,
  icon,
  type,
  label,
  link,
  children,
  size,
}) {
  const { openWindow } = useWindowManager();
  return (
    <>
      <div
        className="desktop-icon"
        onClick={() => {
          if (type === "link" && link) {
            open(link, "_blank");
          } else {
            openWindow(id, icon, type, label, children, link, size);
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

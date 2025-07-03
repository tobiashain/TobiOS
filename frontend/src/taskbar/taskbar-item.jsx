import { useWindowManager } from "../shared/WindowManagerContext";

export default function TaskbarItem({ windowId, label, icon }) {
  const { windowRefs } = useWindowManager();
  return (
    <>
      <div
        className="taskbar-item"
        onClick={() => {
          const el = windowRefs.current[windowId];
          el.style.visibility =
            el.style.visibility === "hidden" ? "visible" : "hidden";
        }}
      >
        <div className="taskbar-item-icon">
          <img src={icon} />
        </div>
        <div className="taskbar-item-label">{label}</div>
      </div>
    </>
  );
}

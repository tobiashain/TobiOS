import { useWindowManager } from "../shared/WindowManagerContext";

interface TaskbarItem {
  windowId: string;
  label: string;
  icon: string;
}

export default function TaskbarItem(props: TaskbarItem) {
  const { windowId, label, icon } = props;
  const { windowRefs, updateZIndex } = useWindowManager();
  return (
    <>
      <div
        className="taskbar-item"
        onClick={() => {
          const el = windowRefs.current[windowId];
          if (!el) return;

          const isMinimized = el.style.visibility === "hidden";

          if (isMinimized) {
            el.style.visibility = "visible";
            updateZIndex(el, windowId);
          } else {
            const wasFocused = !updateZIndex(el, windowId);
            if (wasFocused) {
              el.style.visibility = "hidden";
            }
          }
        }}
      >
        <div className="taskbar-item__icon">
          <img src={icon} />
        </div>
        <div className="taskbar-item__label">{label}</div>
      </div>
    </>
  );
}

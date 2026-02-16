import { useWindowManager } from "../shared/WindowManagerContext";

interface TaskbarItem {
  windowId: string;
  label: string;
  icon: string;
}

export default function TaskbarItem(props: TaskbarItem) {
  const { windowId, label, icon } = props;
  const { windowRefs } = useWindowManager();
  return (
    <>
      <div
        className="taskbar-item"
        onClick={() => {
          const el = windowRefs.current[windowId];
          if (!el) return;

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

export default function TaskbarItem({ windowId, label, icon }) {
  return (
    <>
      <div className="taskbar-item">
        <div className="taskbar-item-icon">
          <img src={icon} />
        </div>
        <div className="taskbar-item-label">{label}</div>
      </div>
    </>
  );
}

export default function TaskbarItem({ windowId, label, icon, onClick }) {
  return (
    <>
      <div
        className="taskbar-item"
        onClick={() => {
          onClick(windowId);
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

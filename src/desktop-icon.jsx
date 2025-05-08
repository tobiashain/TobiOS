export default function DesktopIcon({
  id,
  icon,
  type,
  label,
  link,
  onClick,
  children,
}) {
  return (
    <>
      <div
        className="desktop-icon"
        onClick={() => {
          if (type === "link" && link) {
            open(link);
          } else {
            onClick(id, icon, type, label, children);
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

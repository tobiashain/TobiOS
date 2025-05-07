export default function DesktopIcon({ id, image, type, text, onClick }) {
  return (
    <>
      <div
        className="desktop-icon"
        onClick={() => {
          onClick(id);
        }}
      >
        <div className="image">
          <img src={image} />
        </div>
        <div className="text">{text}</div>
      </div>
    </>
  );
}

import DesktopIcon from "../desktop/desktop-icon";
import MusicApp from "../windowApps/musicApp";
import CalculatorApp from "../windowApps/calculator";

export const renderByType = {
  folder: (props) => (
    <>
      <div className="window-folder">
        {props.children.map((child) => (
          <DesktopIcon key={child.id} {...child} />
        ))}
      </div>
    </>
  ),
  video: (props) => (
    <>
      <div className="video">
        <iframe
          src={`https://www.youtube.com/embed/${props.link}?autoplay=1&controls=0&loop=1&playlist=${props.link}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            aspectRatio: "16 / 9",
          }}
        />
      </div>
    </>
  ),
  music: () => <MusicApp />,
  calculator: () => <CalculatorApp />,
};

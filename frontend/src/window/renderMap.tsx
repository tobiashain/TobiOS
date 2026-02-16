import DesktopIcon from "../desktop/desktop-icon.tsx";
import MusicApp from "../windowApps/music.tsx";
import CalculatorApp from "../windowApps/calculator.jsx";
import { JSX } from "react/jsx-runtime";
import { DesktopIcons } from "../desktop/desktopIcons.ts";

export type WindowType = "folder" | "video" | "iframe" | "music" | "calculator";

interface RenderProps {
  children?: any;
  link?: string;
}

export const renderByType: Record<
  WindowType,
  (props: RenderProps) => JSX.Element
> = {
  folder: (props) => (
    <>
      <div className="window-folder">
        {props.children.map((child: JSX.IntrinsicAttributes & DesktopIcons) => (
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
  iframe: (props) => (
    <>
      <iframe
        src={props.link}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </>
  ),
  music: () => <MusicApp />,
  calculator: () => <CalculatorApp />,
};

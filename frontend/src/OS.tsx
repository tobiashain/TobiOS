import Desktop from "./desktop/desktop";
import Taskbar from "./taskbar/taskbar";
import Boot from "./boot/boot";
import { useState } from "react";
import { WindowManagerProvider } from "./shared/WindowManagerContext";
import { desktopIcons } from "./desktop/desktopIcons";
import { getAllIconUrls, preloadImages } from "./shared/preload";

export default function OS() {
  const [bootUp, setBootUp] = useState<boolean>(true);
  const [transitionIn, setTransitionIn] = useState<boolean>(false);

  const iconsUrls = getAllIconUrls(desktopIcons);
  preloadImages(iconsUrls);
  const techUrls = [
    "icons/tech/csharp.png",
    "icons/tech/docker.png",
    "icons/tech/git.png",
    "icons/tech/github.png",
    "icons/tech/godot.png",
    "icons/tech/javascript.png",
    "icons/tech/mysql.png",
    "icons/tech/nestjs.png",
    "icons/tech/php.png",
    "icons/tech/react.png",
    "icons/tech/sass.png",
    "icons/tech/tailwindcss.png",
    "icons/tech/typescript.png",
    "icons/tech/wordpress.png",
  ];
  preloadImages(techUrls);

  const handleBootFinish = () => {
    setBootUp(false);
    setTransitionIn(true);
  };

  return (
    <>
      <div className="container">
        <div className="screen">
          {bootUp ? (
            <Boot onFinish={handleBootFinish} />
          ) : (
            <WindowManagerProvider>
              <Desktop />
              <Taskbar />
              {transitionIn && <div className="os-unblur-overlay" />}
            </WindowManagerProvider>
          )}
        </div>
      </div>
    </>
  );
}

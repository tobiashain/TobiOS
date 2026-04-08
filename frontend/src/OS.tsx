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

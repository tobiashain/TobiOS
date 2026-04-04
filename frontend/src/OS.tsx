import Desktop from "./desktop/desktop";
import Taskbar from "./taskbar/taskbar";
import Boot from "./boot/boot";
import { useState } from "react";
import { WindowManagerProvider } from "./shared/WindowManagerContext";

export default function OS() {
  const [bootUp, setBootUp] = useState<boolean>(true);

  return (
    <>
      <div className="container">
        <div className="screen">
          {bootUp ? (
            <Boot onFinish={() => setBootUp(false)} />
          ) : (
            <WindowManagerProvider>
              <Desktop />
              <Taskbar />
            </WindowManagerProvider>
          )}
        </div>
      </div>
    </>
  );
}

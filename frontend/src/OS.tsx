import Desktop from "./desktop/desktop";
import Taskbar from "./taskbar/taskbar";
import Boot from "./boot/boot";
import { useState } from "react";
import { WindowManagerProvider } from "./shared/WindowManagerContext";

export default function OS() {
  const [bootUp, setBootUp] = useState<boolean>(false);

  return (
    <>
      <div className="container">
        <div className="screen">
          {bootUp ? (
            <>
              <Boot />
            </>
          ) : (
            <>
              <WindowManagerProvider>
                <Desktop />
                <Taskbar />
              </WindowManagerProvider>
            </>
          )}
        </div>
      </div>
    </>
  );
}

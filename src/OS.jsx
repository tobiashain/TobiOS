import Desktop from "./desktop";
import Taskbar from "./taskbar";
import Boot from "./boot";
import { useState } from "react";
import { WindowManagerProvider } from "./WindowManagerContext";

export default function OS() {
  const [bootUp, setBootUp] = useState(false);

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

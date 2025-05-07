import Desktop from "./desktop";
import Taskbar from "./taskbar";
import Boot from "./boot";
import { useState } from "react";

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
              <Desktop />
              <Taskbar />
            </>
          )}
        </div>
      </div>
    </>
  );
}

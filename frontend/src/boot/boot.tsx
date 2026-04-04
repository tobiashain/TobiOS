import { useEffect, useState } from "react";
import "./boot.scss";

const BOOT_LINES = [
  "Initializing system...",
  "CPU: Intel Core i7  [OK]",
  "Memory check: 16384MB  [OK]",
  "Loading kernel modules...",
  "Mounting file systems...",
  "Starting network services...  [OK]",
  "Loading user profile...",
  "Welcome.",
];

const LINE_DELAY = 320;
const TERMINAL_HOLD = 500;

interface BootProps {
  onFinish: () => void;
}

type Phase = "terminal" | "login";

export default function Boot({ onFinish }: BootProps) {
  const [phase, setPhase] = useState<Phase>("terminal");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const time = useTime();

  useEffect(() => {
    if (phase !== "terminal") return;

    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), LINE_DELAY);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("login"), TERMINAL_HOLD);
    return () => clearTimeout(t);
  }, [phase, visibleLines]);

  return (
    <div className={`boot-root boot-root--${phase}`}>
      {phase === "terminal" && (
        <div className="boot-terminal">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="boot-line">
              <span className="boot-prompt">&gt;&nbsp;</span>
              {line}
            </div>
          ))}
          <span className="boot-cursor" />
        </div>
      )}

      {phase === "login" && (
        <div className="boot-login">
          <div className="boot-login__time">{time}</div>

          <div className="boot-login__user" onClick={onFinish}>
            <div className="boot-login__avatar">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="24" r="14" fill="rgba(255,255,255,0.85)" />
                <ellipse
                  cx="32"
                  cy="58"
                  rx="22"
                  ry="14"
                  fill="rgba(255,255,255,0.85)"
                />
              </svg>
            </div>
            <div className="boot-login__name">User</div>
            <div className="boot-login__hint">Click to sign in</div>
          </div>
        </div>
      )}
    </div>
  );
}

function useTime() {
  const fmt = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(fmt);

  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

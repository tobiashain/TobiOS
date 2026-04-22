import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { DesktopIcons } from "../desktop/desktopIcons";

interface WindowItem {
  id: number;
  windowId: string;
  label: string;
  type: string;
  icon: string;
  children?: DesktopIcons[];
  link?: string;
  size?: string;
}

interface WindowManagerContextType {
  windows: WindowItem[];
  openWindow: (props: DesktopIcons) => void;
  closeWindow: (windowId: string) => void;
  updateZIndex: (el: HTMLDivElement) => boolean;
  windowRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null,
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const windowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const highestZindex = useRef<number>(1);

  const updateZIndex = useCallback((el: HTMLDivElement): boolean => {
    const currentZIndex = Number(el?.style.zIndex) || 0;
    if (currentZIndex !== highestZindex.current) {
      const newZ = highestZindex.current + 1;
      highestZindex.current = newZ;
      el.style.zIndex = newZ.toString();
      return true;
    }
    return false;
  }, []);

  const openWindow = useCallback(
    (props: DesktopIcons) => {
      const { id, label, type, icon, children, link, size } = props;
      setWindows((prev) => {
        if (!prev.some((item) => item.windowId === id)) {
          return [
            ...prev,
            {
              id: Date.now(),
              windowId: id,
              label,
              type,
              icon,
              children,
              link,
              size,
            },
          ];
        } else {
          const el = windowRefs.current[id];
          if (el) {
            if (el.style.visibility === "hidden")
              el.style.visibility = "visible";
            updateZIndex(el);
          }
          return prev;
        }
      });
    },
    [updateZIndex],
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.windowId !== windowId));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{ windows, openWindow, closeWindow, updateZIndex, windowRefs }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider",
    );
  }
  return context;
}

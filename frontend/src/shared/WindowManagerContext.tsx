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
  focusedWindowId: string | null;
  openWindow: (props: DesktopIcons) => void;
  closeWindow: (windowId: string) => void;
  updateZIndex: (el: HTMLDivElement, windowId: string) => boolean;
  windowRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null,
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const windowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const highestZindex = useRef<number>(1);

  const updateZIndex = useCallback(
    (el: HTMLDivElement, windowId: string): boolean => {
      const currentZIndex = Number(el?.style.zIndex) || 0;
      if (currentZIndex !== highestZindex.current) {
        const newZ = highestZindex.current + 1;
        highestZindex.current = newZ;
        el.style.zIndex = newZ.toString();
        setFocusedWindowId(windowId);
        return true;
      }
      setFocusedWindowId(windowId);
      return false;
    },
    [],
  );

  const openWindow = useCallback(
    (props: DesktopIcons) => {
      const { id, label, type, icon, children, link, size } = props;
      setWindows((prev) => {
        if (!prev.some((item) => item.windowId === id)) {
          setFocusedWindowId(id);
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
            updateZIndex(el, id);
          }
          return prev;
        }
      });
    },
    [updateZIndex],
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.windowId !== windowId));

    setFocusedWindowId((currentFocused) => {
      if (currentFocused === windowId) {
        let nextFocused: string | null = null;
        let maxZ = 0;
        Object.entries(windowRefs.current).forEach(([id, el]) => {
          if (el && id !== windowId) {
            const z = Number(el.style.zIndex) || 0;
            if (z > maxZ) {
              maxZ = z;
              nextFocused = id;
            }
          }
        });
        return nextFocused;
      }
      return currentFocused;
    });
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        focusedWindowId,
        openWindow,
        closeWindow,
        updateZIndex,
        windowRefs,
      }}
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

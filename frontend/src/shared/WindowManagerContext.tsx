// This file defines a Context to share data across components without prop drilling.

// Usage:
// Wrap your component tree (or part of it) with the Provider and pass the value to share.
// Inside any nested component, use `useContext(Context)` or call the custom Hook to read or consume the shared value.

import { createContext, useContext, useState, useRef, ReactNode } from "react";
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
  windowRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  highestZindex: number;
  setHighestZindex: React.Dispatch<React.SetStateAction<number>>;
}

// 1. CreateContext: Initializes the Context object used to hold shared data.
const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null,
);

// 2. Provider: Wraps components that need access to the Context, supplying the shared value.
export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const windowRefs = useRef({});
  const [highestZindex, setHighestZindex] = useState<number>(1);

  const openWindow = (props: DesktopIcons) => {
    // prev is the initial value (windows or [])
    // .some is a foreach and checks if any item returns true in the callback function (returns true/false)
    // in this case it checks if any item already has the incoming id so there arent the same window opened twice
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
      }
      return prev;
    });
  };

  const closeWindow = (windowId: string) => {
    setWindows((prevWindows) =>
      // .filter is a foreach and returns a new array that only contains items that fulfill the callback function
      // in this case every id that doesnt equals the incoming id is in the new array
      prevWindows.filter((window) => window.windowId !== windowId),
    );
  };

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        windowRefs,
        highestZindex,
        setHighestZindex,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

// 3. Consumer or useContext Hook: Used inside nested components to access the shared data.
//    Custom hook to consume the WindowManagerContext safely
export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider",
    );
  }
  return context;
}

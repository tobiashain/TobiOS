import React, { createContext, useContext, useState } from "react";

const WindowManagerContext = createContext(null);

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([]);

  const openWindow = (id, icon, type, label, children) => {
    setWindows((prev) => {
      if (!prev.some((item) => item.windowId === id)) {
        return [
          ...prev,
          { id: Date.now(), windowId: id, label, type, icon, children },
        ];
      }
      return prev;
    });
  };

  const closeWindow = (windowId) => {
    setWindows((prevWindows) =>
      prevWindows.filter((window) => window.windowId !== windowId)
    );
  };

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider"
    );
  }
  return context;
}

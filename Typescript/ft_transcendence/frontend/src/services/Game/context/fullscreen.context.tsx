import React, { useState } from "react";
import { FullScreenHandle, useFullScreenHandle } from "react-full-screen";

interface fullscreenProps {
  handle: FullScreenHandle;
  dimensions: { width: number; height: number };
  setDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}

const fullScreenContext = React.createContext<fullscreenProps | undefined>(
  undefined
);

export function FullScreenProvider({ children }: any) {
  const handle: FullScreenHandle = useFullScreenHandle();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  return (
    <fullScreenContext.Provider
      value={{
        handle: handle,
        dimensions: dimensions,
        setDimensions: setDimensions,
      }}
    >
      {children}
    </fullScreenContext.Provider>
  );
}

export function useFullScreen() {
  const context = React.useContext(fullScreenContext);
  if (context === undefined) {
    throw new Error("useFullScreen must be used within a FullScreenProvider");
  }
  return context;
}

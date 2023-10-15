import React, { useEffect } from "react";
import { mySocket } from "..";

interface socketProps {
  socket: mySocket;
}

const socketContext = React.createContext<socketProps | undefined>(undefined);

export function SocketProvider({ children }: any) {
  const socketRef = React.useRef<mySocket>(new mySocket());

  useEffect(() => {
    socketRef.current.socket.on("connect", () => {});
    return () => {
      socketRef.current.socket.off("connect");
    };
  }, []);

  return (
    <socketContext.Provider
      value={{
        socket: socketRef.current,
      }}
    >
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  const context = React.useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

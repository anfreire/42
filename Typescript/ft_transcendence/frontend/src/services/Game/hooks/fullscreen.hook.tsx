import { FullScreen } from "react-full-screen";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { FullscreenButton, useFullScreen } from "..";
import { useTheme as useMyTheme } from "../../../common/Theme";

export default function FullScreenHook({ children }: any) {
  const myTheme = useMyTheme();
  const boxRef = useRef<HTMLDivElement>(null);
  const fullscreen = useFullScreen();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!boxRef || !boxRef.current) return;
    handleResize();
  }, [boxRef, fullscreen.handle.active]);

  const handleResize = () => {
    if (!boxRef || !boxRef.current) return;
    if (fullscreen.handle.active) {
      fullscreen.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      fullscreen.setDimensions({
        width: boxRef.current?.offsetWidth || 0,
        height: boxRef.current?.offsetHeight || 0,
      });
    }
  };

  return (
    <Box
      ref={boxRef}
      sx={{
        border: "1px solid",
        borderColor: myTheme.accentColor,
        borderRadius: 3,
        height: "100%",
        width: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <FullScreen handle={fullscreen.handle}>
        <FullscreenButton />
        {children}
      </FullScreen>
    </Box>
  );
}

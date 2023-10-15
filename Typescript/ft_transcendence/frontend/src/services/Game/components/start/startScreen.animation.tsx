import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFullScreen } from "../..";
import { useTheme as useMyTheme } from "../../../../common/Theme";

const VELOCITY = 0.5;

function getRandomDirection() {
  const direction = { x: 0, y: 1 };
  while (Math.abs(direction.x) <= 0.5 && Math.abs(direction.y) >= 0.5) {
    const heading = Math.random() * 2 * Math.PI;
    direction.x = Math.cos(heading);
    direction.y = Math.sin(heading);
  }
  return direction;
}

export default function StartScreenAnimation() {
  const myTheme = useMyTheme();
  const fullscreen = useFullScreen();
  const [props, setProps] = useState({
    dir: getRandomDirection(),
    pos: { x: 50, y: 50 },
  });
  const lastTime = useRef<number | undefined>(undefined);

  const update = (time: number) => {
    if (lastTime.current === undefined) {
      lastTime.current = time;
    } else {
      setProps((prev) => ({
        dir: {
          x: prev.pos.x < 0 || prev.pos.x > 100 ? -prev.dir.x : prev.dir.x,
          y: prev.pos.y < 0 || prev.pos.y > 100 ? -prev.dir.y : prev.dir.y,
        },
        pos: {
          x:
            prev.pos.x < 0
              ? 0.1
              : prev.pos.x > 100
              ? 99.9
              : prev.pos.x + prev.dir.x * VELOCITY,
          y:
            prev.pos.y < 0
              ? 0.1
              : prev.pos.y > 100
              ? 99.9
              : prev.pos.y + prev.dir.y * VELOCITY,
        },
      }));
    }
    window.requestAnimationFrame(update);
  };

  useEffect(() => {
    window.requestAnimationFrame(update);
  }, []);

  return (
    <Box
      overflow="hidden"
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      <div
        id="ball"
        style={{
          height: fullscreen.dimensions.width * 0.04,
          width: fullscreen.dimensions.width * 0.04,
          backgroundColor: myTheme.accentColor,
          borderRadius: "50%",
          position: "absolute",
          left: props.pos.x + "%",
          top: props.pos.y + "%",
          transform: `translate(-${props.pos.x}%, -${props.pos.y}%)`,
        }}
      />
    </Box>
  );
}

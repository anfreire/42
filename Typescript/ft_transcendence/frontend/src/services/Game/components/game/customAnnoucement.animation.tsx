import { SpringRef, animated, useSpring } from "react-spring";
import { Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CustomActions } from "../../utils/game.types";
import { useFullScreen } from "../..";
import { useTheme } from "../../../../common/Theme";

export default function CustomAnnoucementAnimation({
  text,
  action,
  setAction,
  leftUser,
  setLeftUser,
  rightUser,
  setRightUser,
  setStackProps,
}: {
  text: string;
  action: CustomActions;
  setAction: React.Dispatch<React.SetStateAction<CustomActions>>;
  leftUser: {
    username: string;
    avatar: string;
  };
  setLeftUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      avatar: string;
    }>
  >;
  rightUser: {
    username: string;
    avatar: string;
  };
  setRightUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      avatar: string;
    }>
  >;
  setStackProps: SpringRef<{
    opacity: number;
  }>;
}) {
  const fullscreen = useFullScreen();
  const theme = useTheme();
  const [value, setValue] = useState(50);
  const [movements, setMovements] = useState(0);
  const [props, setProps] = useSpring(() => ({
    from: { top: -fullscreen.dimensions.height * 0.375, opacity: 0 },
    to: { top: -fullscreen.dimensions.height * 0.375 + 10, opacity: 0.3 },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    if (action === "INVERT_CONTROLS")
      setStackProps(() => ({
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: {
          duration: 1000,
        },
      }));
    setTimeout(() => {
      if (action === "BALL_SPEED_UP" || action === "PADDLE_SPEED_UP")
        setValue((prev) => (prev += 1));
      else if (action === "BALL_SPEED_DOWN" || action === "PADDLE_SPEED_DOWN")
        setValue((prev) => (prev -= 1));
      else if (action === "INVERT_CONTROLS") {
        setStackProps(() => ({
          from: { opacity: 0 },
          to: { opacity: 1 },
          config: {
            duration: 1000,
          },
        }));
        const left = leftUser;
        const right = rightUser;
        setLeftUser(right);
        setRightUser(left);
        setTimeout(() => {
          setStackProps(() => ({
            from: { opacity: 1 },
            to: { opacity: 0 },
            config: {
              duration: 1000,
            },
          }));
          setTimeout(() => {
            setStackProps(() => ({
              from: { opacity: 0 },
              to: { opacity: 1 },
              config: {
                duration: 1000,
              },
            }));
            setLeftUser(left);
            setRightUser(right);
            setAction("NONE");
          }, 1000);
        }, 4000);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (action === "BALL_SPEED_UP" || action === "PADDLE_SPEED_UP") {
      if (movements === 0) {
        setTimeout(() => {
          if (value > 50 && value < 100) setValue((prev) => prev + 1);
          else if (value === 100) setMovements(1);
        }, 40);
      } else if (movements === 1) {
        setTimeout(() => {
          if (value < 100 && value > 50) setValue((prev) => prev - 1);
          else if (value === 50) setMovements(2);
        }, 40);
      }
    } else if (action === "BALL_SPEED_DOWN" || action === "PADDLE_SPEED_DOWN") {
      if (movements === 0) {
        setTimeout(() => {
          if (value < 50 && value > 0) setValue((prev) => prev - 1);
          else if (value === 0) setMovements(1);
        }, 40);
      } else if (movements === 1) {
        setTimeout(() => {
          if (value > 0 && value < 50) setValue((prev) => prev + 1);
          else if (value === 50) setMovements(2);
        }, 40);
      }
    }
  }, [value]);

  useEffect(() => {
    if (movements === 1) {
      setTimeout(() => {
        if (action === "BALL_SPEED_UP" || action === "PADDLE_SPEED_UP")
          setValue(99);
        else setValue(1);
      }, 3000);
    } else if (movements === 2) {
      setTimeout(() => {
        setProps(() => ({
          from: {
            top: -fullscreen.dimensions.height * 0.375 + 10,
            opacity: 0.3,
          },
          to: { top: -fullscreen.dimensions.height * 0.375, opacity: 0 },
          config: {
            duration: 1000,
          },
        }));
        setTimeout(() => {
          setAction("NONE");
        }, 1000);
      }, 1000);
    }
  }, [movements]);

  return (
    <div style={{ position: "absolute" }}>
      <animated.div
        style={{
          position: "relative",
          width: fullscreen.dimensions.width * 0.7,
          height: fullscreen.dimensions.height * 0.25,
          borderRadius: "10px",
          transform: "translateX(-50%)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          left: "50%",
          alignItems: "center",
          ...props,
        }}
      >
        <Stack
          direction="column"
          spacing={0}
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // center the text
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.currTheme === "dark" ? "#ffffff" : "#000000",
              fontWeight: "bold",
              width: fullscreen.dimensions.width * 0.5,
              fontSize: fullscreen.dimensions.height * 0.1,
              left: "50%",
            }}
          >
            {text}
          </Typography>
          {text === "Control Inversion" ? null : (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: fullscreen.dimensions.width * 0.3,
                height: fullscreen.dimensions.height * 0.1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RemoveIcon
                sx={{
                  color: theme.currTheme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "40px",
                }}
              />
              <Slider
                sx={{
                  width: "100%",
                  color: theme.currTheme === "dark" ? "#ffffff" : "#000000",
                }}
                value={value}
                onChange={(_, __) => {
                  setValue((prev) => prev);
                }}
              />
              <AddIcon
                sx={{
                  color: theme.currTheme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "40px",
                }}
              />
            </Stack>
          )}
        </Stack>
      </animated.div>
    </div>
  );
}

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { RightDrawer } from "..";
import { useUser } from "../../User";
import { useComponents } from "../../../common/Components";
import { useGame } from "../../Game";

export default function OpenRightDrawerButton() {
  const components = useComponents();
  const user = useUser();
  const game = useGame();

  return (
    <React.Fragment key="left">
      <Avatar
        sx={{
          height: "40px",
          width: "40px",
          cursor: "pointer",
          opacity: game.location === "GAME" ? 0.5 : 1,
          pointerEvents: game.location === "GAME" ? "none" : "auto",
        }}
        onClick={() =>
          components.setDrawers({
            ...components.drawers,
            rightOpen: true,
          })
        }
        onKeyDown={() =>
          components.setDrawers({
            ...components.drawers,
            rightOpen: true,
          })
        }
        src={user.avatar}
      />
      <RightDrawer />
    </React.Fragment>
  );
}

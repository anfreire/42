import PeopleIcon from "@mui/icons-material/People";
import { useComponents } from "../../../common/Components";
import { useGame } from "../../Game";
import React from "react";
import { LeftDrawer } from "..";
import { FriendRequestsDialog } from "../../Social";

export default function OpenLeftDrawerButton() {
  const components = useComponents();
  const game = useGame();

  return (
    <>
      <React.Fragment key="left">
        <PeopleIcon
          sx={{
            fontSize: "40px",
            marginLeft: "10px",
            cursor: "pointer",
            opacity: game.location === "GAME" ? 0.5 : 1,
            pointerEvents: game.location === "GAME" ? "none" : "auto",
          }}
          onClick={() =>
            components.setDrawers({ ...components.drawers, leftOpen: true })
          }
          onKeyDown={() =>
            components.setDrawers({
              ...components.drawers,
              leftOpen: true,
            })
          }
        />
        <LeftDrawer />
      </React.Fragment>
      <FriendRequestsDialog />
    </>
  );
}

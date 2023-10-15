import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Divider,
} from "@mui/material";
import { useComponents } from "../../../../common/Components";
import { useSocial } from "../../../Social";
import FriendListItem from "./friend.listItem";

export default function ChatWithFriendDialog() {
  const components = useComponents();
  const social = useSocial();

  return (
    <Dialog
      sx={{ textAlign: "center" }}
      open={components.dialogs.chatWithFriendOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          chatWithFriendOpen: false,
        });
      }}
    >
      <DialogTitle sx={{ fontSize: "30px" }}>
        Who do you want to talk to?
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "action.hover",
          marginBottom: "20px",
          marginLeft: "20px",
          marginRight: "20px",
          textAlign: "center",
        }}
      >
        <List
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            marginTop: "20px",
          }}
        >
          {social.friends.map((friend, index) => {
            return (
              <div key={index}>
                <FriendListItem
                  friend={friend}
                  choosed={null}
                  setChoosed={null}
                />
                {index !== social.friends.length - 1 && <Divider />}
              </div>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
}

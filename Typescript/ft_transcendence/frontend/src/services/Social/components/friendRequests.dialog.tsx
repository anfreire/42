import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  List,
  Typography,
} from "@mui/material";
import { FriendRequestListItem, useSocial } from "..";
import { useComponents } from "../../../common/Components";

export default function FriendRequestsDialog() {
  const social = useSocial();
  const components = useComponents();

  return (
    <Dialog
      sx={{
        textAlign: "center",
      }}
      open={components.dialogs.friendRequestOpen}
      onClose={() => {
        components.setDialogs({
          ...components.dialogs,
          friendRequestOpen: false,
        });
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DialogContent>
          {social.friendRequests.length === 0 ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                You have no friend requests
                <SentimentVeryDissatisfiedIcon
                  sx={{
                    marginTop: "10px",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Typography>
            </>
          ) : (
            <List
              sx={{
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {social.friendRequests.map((friend, index) => {
                return (
                  <div key={index}>
                    <FriendRequestListItem friend={friend} />
                    {index !== social.friendRequests.length - 1 && <Divider />}
                  </div>
                );
              })}
            </List>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
}

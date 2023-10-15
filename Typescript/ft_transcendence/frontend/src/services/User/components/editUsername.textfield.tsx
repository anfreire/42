import { TextField } from "@mui/material";
import { useUser } from "..";

export default function EditUsernameTextField(props: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const user = useUser();
  
  return (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Username"
      type="text"
      fullWidth
      onChange={(e) => props.setInput(e.target.value)}
      variant="outlined"
      value={props.input}
      sx={{
        width: "80%",
      }}
      color={user.color}
    />
  );
}

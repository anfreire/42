import { Button } from "@mui/material";
import { useComponents } from "../../../common/Components";
import { Auth42Utils } from "..";
import icon42 from "../../../assets/icons/42";

export default function Auth42Button(props: {
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const components = useComponents();

  return (
    <Button
      onClick={() => Auth42Utils.openPopup(props.setCode)}
      variant="contained"
      startIcon={icon42()}
      disabled={components.buttons.auth42Disabled}
    >
      Authentication
    </Button>
  );
}

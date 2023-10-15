import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  Color,
  ThemeUtils,
  useTheme as useMyTheme,
} from "../../../common/Theme";

interface SelectColorStackProps {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
}

export function SelectColorStack(props: SelectColorStackProps) {
  const myTheme = useMyTheme();

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "20px",
        color: "text.primary",
      }}
    >
      <Typography variant="h5">Accent color</Typography>
      <ToggleButtonGroup
        onChange={(_, newColor) => {
          if (newColor) {
            props.setColor(newColor);
          }
        }}
        value={props.color}
        exclusive
        sx={{
          "& .MuiToggleButton-root.Mui-selected": {
            borderColor: myTheme.currTheme === "dark" ? "#fff" : "#000",
            borderWidth: "2px",
            backgroundColor: ThemeUtils.getColor(
              myTheme.currTheme,
              props.color
            ),
          },
          "& .MuiToggleButton-root:not(:first-of-type)": {
            marginLeft: "5px",
            borderRadius: "4px",
          },
          "& .MuiToggleButton-root:first-of-type": {
            borderRadius: "4px",
          },
        }}
      >
        <ToggleButton
          value="primary"
          sx={{
            ...ThemeUtils.getColorCSS(myTheme.currTheme, "primary"),
          }}
        />
        <ToggleButton
          value="secondary"
          sx={{
            ...ThemeUtils.getColorCSS(myTheme.currTheme, "secondary"),
          }}
        />
        <ToggleButton
          value="error"
          sx={{
            ...ThemeUtils.getColorCSS(myTheme.currTheme, "error"),
          }}
        />
        <ToggleButton
          value="warning"
          sx={{
            ...ThemeUtils.getColorCSS(myTheme.currTheme, "warning"),
          }}
        />
        <ToggleButton
          value="success"
          sx={{
            ...ThemeUtils.getColorCSS(myTheme.currTheme, "success"),
          }}
        />
      </ToggleButtonGroup>
    </Stack>
  );
}

import {
  Button,
  Divider,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { gray } from "../../../share-theme/themePrimitives.ts";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

const Preference = () => {
  const [timeZone, setTimeZone] = useState("");
  const [timeZoneDate, setTimeZoneDate] = useState("");
  const { mode, setMode } = useColorScheme();
  const getMode = (m: string) => {
    const staticMode = {
      ["light"]: mode === "light",
      ["dark"]: mode === "dark",
      ["system"]: mode === "system",
    };
    return staticMode[m];
  };

  const getActive = (mo: string) => (getMode(mo) ? "" : gray[700]);
  const getTick = (m: string) =>
    getMode(m) ? <CheckCircleRoundedIcon color="success" /> : <></>;
  const getActiveDarkMode = (mo: string) =>
    getMode(mo) ? "#fff" : mode === "light" ? gray[200] : gray[700];
  const changeMode = (mod: "light" | "dark" | "system") => {
    setMode(mod);
  };

  useEffect(() => {
    // Get the user's time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);
    // Get the current date and time, formatted with the time zone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: userTimeZone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "long", // e.g., "Pacific Standard Time"
    });
    setTimeZoneDate(formatter.format(now));
  }, []);

  return (
    <Stack gap={2} width="100%">
      <Stack gap={1}>
        <Typography variant="h4" fontWeight={600}>
          Preference
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Get notified what's happening right now you can turn off at any time
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography fontSize={15} fontWeight={600}>
          Select Theme
        </Typography>
        <Stack direction="row" gap={4} py={2}>
          <Button
            sx={{ px: 2, border: `1px solid ${getActive("light")}` }}
            onClick={() => changeMode("light")}
            startIcon={<LightModeIcon />}
            endIcon={getTick("light")}
          >
            Light mode
          </Button>
          <Button
            sx={{
              px: 2,
              border: "1px solid",
              borderColor: getActiveDarkMode("dark"),
            }}
            onClick={() => changeMode("dark")}
            startIcon={<DarkModeIcon />}
            endIcon={getTick("dark")}
          >
            Dark mode
          </Button>
          <Button
            sx={{
              px: 2,
              border: "1px solid",
              borderColor: getActiveDarkMode("system"),
            }}
            onClick={() => changeMode("system")}
            startIcon={<SettingsSuggestIcon />}
            endIcon={getTick("system")}
          >
            System
          </Button>
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Stack direction="row" alignItems="center" gap={2} minWidth={350}>
          <Typography minWidth={100}>Time zone:</Typography>
          <Select sx={{ minWidth: 300 }} value={timeZone}>
            <MenuItem value={timeZone}>{timeZone}</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2} minWidth={350}>
          <Typography minWidth={100}>Date time:</Typography>
          <Select sx={{ minWidth: 300 }} value={timeZoneDate}>
            <MenuItem value={timeZoneDate}>{timeZoneDate}</MenuItem>
          </Select>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Preference;

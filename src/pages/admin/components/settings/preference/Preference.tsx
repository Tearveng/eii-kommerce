import { Divider, Stack, Typography } from "@mui/material";

const Preference = () => {
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
      </Stack>
    </Stack>
  );
};

export default Preference;

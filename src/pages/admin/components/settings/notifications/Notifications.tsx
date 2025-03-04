import { Checkbox, Divider, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../../redux.ts";
import { IOSSwitch } from "../../ui/AntSwitch.tsx";

const Notifications = () => {
  const { user } = useAppSelector((state) => state.application);

  return (
    <Stack gap={2} width="100%">
      <Stack gap={1}>
        <Typography variant="h4" fontWeight={600}>
          Notifications
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Get notified what's happening right now you can turn off at any time
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" gap={20}>
        <Stack gap={1} maxWidth={300}>
          <Typography variant="h6" fontWeight={600}>
            Email Notifications
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Substance can send you email notifications for any new direct
            messages
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" gap={2}>
            <IOSSwitch sx={{ m: 1 }} defaultChecked />
            <Typography variant="body2" fontWeight={400} mt={0.2}>
              On
            </Typography>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  News and Update settings
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  The latest news about the latest features and software update
                  settings
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked={false} />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  Tips and Tutorials
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Tips and tricks in order to increase your performance
                  efficiency
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  Offer and Promotions
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Promotions about software package prices and about the latest
                  discounts
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" gap={20}>
        <Stack gap={1} maxWidth={300}>
          <Typography variant="h6" fontWeight={600}>
            More Activity
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Substance can send you email notifications for any new direct
            messages
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" gap={2}>
            <IOSSwitch sx={{ m: 1 }} defaultChecked />
            <Typography variant="body2" fontWeight={400} mt={0.2}>
              On
            </Typography>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked={false} />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  All Reminders & Activity
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Notify me all system activities and reminders that have been
                  created
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked={false} />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  Activity only
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Only notify me we have the latest activities updates about
                  increasing or decreasing data
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Checkbox defaultChecked />
              <Stack mt={2.3}>
                <Typography variant="body2" fontWeight={600}>
                  Important Reminder only
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Only notify me all the reminders that have been made
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Notifications;

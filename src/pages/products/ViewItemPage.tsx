import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ViewItemCarousel from "./view-item/carousel/ViewItemCarousel.tsx";

const ViewItemPage = () => {
  const [value] = useState<number | null>(2);

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Stack width="40%">
          <ViewItemCarousel />
        </Stack>

        <Stack width="50%" gap={2}>
          <Stack>
            <Typography variant="h5">Extra Bass</Typography>
            <Stack direction="row" gap={1}>
              <Rating size="small" name="read-only" value={value} readOnly />
              <Typography variant="body2" color="textSecondary">
                (120 reviews)
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="h4">$120</Typography>
            <Typography variant="body2" color="textSecondary">
              (10% off)
            </Typography>
          </Stack>
          <Typography color="textSecondary" variant="body2">
            Turn down the world's noise with the long-lasting noise cancellation
            performance of the WH-CH710N wireless headphones. Dual Noise Sensor
            technology automatically senses your environment to deliver an
            amazing sound experience.
          </Typography>
          <Typography variant="button">Size</Typography>
          <Stack direction="row" gap={2}>
            <Button variant="outlined">S</Button>
            <Button variant="outlined">M</Button>
            <Button variant="outlined">L</Button>
            <Button variant="outlined">XL</Button>
          </Stack>
          <Typography variant="button">Variant</Typography>
          <Stack direction="row" gap={2}>
            <Stack
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid red",
                borderRadius: "50%",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                sx={{
                  width: "30px",
                  height: "30px",
                  bgcolor: "red",
                  borderRadius: "50%",
                }}
              ></Typography>
            </Stack>
            <Stack
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid green",
                borderRadius: "50%",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                sx={{
                  width: "30px",
                  height: "30px",
                  bgcolor: "green",
                  borderRadius: "50%",
                }}
              ></Typography>
            </Stack>
            <Stack
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid black",
                borderRadius: "50%",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                sx={{
                  width: "30px",
                  height: "30px",
                  bgcolor: "black",
                  borderRadius: "50%",
                }}
              ></Typography>
            </Stack>
            <Stack
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid orange",
                borderRadius: "50%",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                sx={{
                  width: "30px",
                  height: "30px",
                  bgcolor: "orange",
                  borderRadius: "50%",
                }}
              ></Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ViewItemPage;

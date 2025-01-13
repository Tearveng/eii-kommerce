import {
  Box,
  Button,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ViewItemCarousel from "./view-item/carousel/ViewItemCarousel.tsx";
import { useGetProductByIdQuery } from "../../services/productApi.ts";
import { useParams } from "react-router-dom";
import { IProductResponse } from "../../services/types/ProductInterface.tsx";

const ViewItemPage = () => {
  const param = useParams();
  const [value] = useState<number | null>(2);
  const [productDetail, setProductDetail] = useState<
    IProductResponse | undefined
  >(undefined);
  const { data, isLoading, isFetching, isSuccess } = useGetProductByIdQuery(
    {
      id: Number(param.id),
    },
    { skip: !param.id },
  );

  useEffect(() => {
    if (data) {
      setProductDetail(data);
    }
  }, [isSuccess]);

  const menuQuantity = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => (
      <MenuItem value={i + 1}>{i + 1}</MenuItem>
    ));
  }, []);

  if (isLoading || isFetching) {
    return <>loading...</>;
  }

  return (
    productDetail && (
      <Box>
        <Stack direction="row" gap={4} flexWrap="wrap" justifyContent="center">
          <Stack>
            <ViewItemCarousel />
          </Stack>

          <Stack px={4}>
            <Stack maxWidth={540} gap={1}>
              <Stack>
                <Typography variant="h5">{productDetail.name}</Typography>
                <Stack direction="row" gap={1}>
                  <Rating
                    size="small"
                    name="read-only"
                    value={value}
                    readOnly
                  />
                  <Typography variant="body2" color="textSecondary">
                    (120 reviews)
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography variant="h4">${productDetail.price}</Typography>
                <Typography variant="body2" color="textSecondary">
                  (10% off)
                </Typography>
              </Stack>
              <Typography color="textSecondary" variant="body2">
                {productDetail.description}
                {/*Turn down the world's noise with the long-lasting noise*/}
                {/*cancellation performance of the WH-CH710N wireless headphones.*/}
                {/*Dual Noise Sensor technology automatically senses your*/}
                {/*environment to deliver an amazing sound experience.*/}
              </Typography>
              <Stack>
                <Typography variant="button">Size</Typography>
                <Stack direction="row" gap={2}>
                  <Button variant="outlined" size="small">
                    S
                  </Button>
                  <Button variant="outlined" size="small">
                    M
                  </Button>
                  <Button variant="outlined" size="small">
                    L
                  </Button>
                  <Button variant="outlined" size="small">
                    XL
                  </Button>
                </Stack>
              </Stack>
              <Stack>
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
              <Stack>
                <Typography variant="button">QUANTITY</Typography>
                <Select
                  size="small"
                  variant="outlined"
                  sx={{ maxWidth: "120px" }}
                  value={"1"}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  {menuQuantity}
                </Select>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                gap={2}
                flexWrap="wrap"
              >
                <Button
                  variant="outlined"
                  sx={{
                    boxShadow: "none",
                    flexGrow: 1,
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                  }}
                  size="large"
                >
                  add to whitelist
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    flexGrow: 1,
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                  }}
                  size="large"
                >
                  buy now
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    )
  );
};

export default ViewItemPage;

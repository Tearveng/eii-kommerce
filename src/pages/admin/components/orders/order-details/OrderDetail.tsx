import Box from "@mui/material/Box";
import { useGetOrderDetailQuery } from "../../../../../services/orderApi.ts";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IOrderResponse } from "../../../../../services/types/OrderInterface.tsx";
import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import {
  formatCambodianPhoneNumber,
  getChipStatus,
} from "../../../../../utils/internals/common.tsx";
import { dateFullDayFormat, formatPrice } from "../../../../../utils/common.ts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IUserResponse } from "../../../../../services/types/UserInterface.tsx";
import { useGetUserByIdQuery } from "../../../../../services/userApi.ts";
import { IItemResponse } from "../../../../../services/types/ItemInterface.tsx";
import { grey } from "@mui/material/colors";
import { gray } from "../../../share-theme/themePrimitives.ts";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";

const OrderDetail = () => {
  const param = useParams();
  const [order, setOrder] = useState<IOrderResponse | null>(null);
  const [profile, setProfile] = useState<IUserResponse | null>(null);
  const [client, setClient] = useState<IUserResponse | null>(null);
  const {
    data: orderDetail,
    isLoading,
    isFetching,
    isSuccess: orderDetailSuccess,
  } = useGetOrderDetailQuery({ id: Number(param.id) }, { skip: !param.id });
  const { data: profileDetail, isSuccess: profileDetailSuccess } =
    useGetUserByIdQuery(
      { id: orderDetail ? Number(orderDetail!.profileId) : 1 },
      { skip: !orderDetail },
    );
  const { data: customerDetail, isSuccess: customerDetailSuccess } =
    useGetUserByIdQuery(
      { id: orderDetail ? Number(orderDetail!.clientId) : 1 },
      { skip: !orderDetail },
    );

  const mapListItem = (item: IItemResponse) => {
    return (
      <Stack maxWidth={700} width="100%" direction="row">
        <Stack direction="row" alignItems="center" gap={2} width="100%">
          <Stack
            width="90px"
            height="80px"
            bgcolor={grey[200]}
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
          >
            <img
              style={{
                width: "80%",
                height: "80%",
                objectFit: "cover",
              }}
              src={item.stockUrl}
              alt={item.stockUrl ?? ""}
              loading="lazy"
            />
          </Stack>
          <Stack gap={0.5} width="100%">
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography fontWeight={600} fontSize={15}>
                {item.name}
              </Typography>
              <Typography fontWeight={600} fontSize={15}>
                ${" "}
                {Number(item.totalPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Stack>
            <Typography color="textDisabled">{item.sku}</Typography>
            <Typography color="textDisabled">
              Quantity: {item.quantity}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const calculateDiscount = (items: IItemResponse[]) => {
    return items
      .map(
        (i) =>
          Number(i.totalPrice) -
          parseInt(
            `${Number(i.totalPrice) * (1 - Number(i.discount) / 100)}`,
            10,
          ),
      )
      .reduce((sum, current) => sum + current, 0);
  };

  useEffect(() => {
    if (orderDetail) {
      setOrder(orderDetail);
    }
  }, [orderDetail, orderDetailSuccess]);

  useEffect(() => {
    if (profileDetail) {
      setProfile(profileDetail);
    }
  }, [profileDetail, profileDetailSuccess]);

  useEffect(() => {
    if (customerDetail) {
      setClient(customerDetail);
    }
  }, [customerDetail, customerDetailSuccess]);

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      {order && (
        <Stack direction="row" gap={8} flexWrap="wrap">
          <Stack maxWidth={700} width="100%">
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="h5">{`Order - #${order.id.toString().padStart(6, "0")}`}</Typography>
                {getChipStatus(order.status)}
              </Stack>
              <Stack direction="row" gap={2} alignItems="center">
                <Stack direction="row" gap={1}>
                  <Typography variant="body2" color="textDisabled">
                    Order date
                  </Typography>
                  <Typography>{dateFullDayFormat(order.createdAt)}</Typography>
                </Stack>
                <ArrowForwardIosIcon sx={{ width: 12 }} />
                {profile && (
                  <Stack direction="row" gap={1}>
                    <Typography variant="body2" color="textDisabled">
                      Order from
                    </Typography>
                    <NavLink to={"#"}>
                      <Typography>{profile.username}</Typography>
                    </NavLink>
                  </Stack>
                )}
              </Stack>
            </Stack>

            <br />
            <Divider />
            <br />
            <Stack gap={1}>
              <Typography fontWeight={600} fontSize={15}>
                Items
              </Typography>
              <Stack gap={2}>
                {order.items.map((item) => mapListItem(item))}
              </Stack>
            </Stack>
            <br />
            <Divider />
            <br />
            <Stack gap={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600} fontSize={15}>
                  Payment details
                </Typography>
                {getChipStatus(order.status)}
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="textDisabled">Payment method</Typography>
                <Typography>Cash</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="textDisabled">Subtotal</Typography>
                <Stack direction="row" gap={1}>
                  <Typography>{order.items.length} items</Typography>
                  <Typography>${formatPrice(order.subtotal)}</Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="textDisabled">Discount</Typography>
                <Stack direction="row" gap={1}>
                  {Number(calculateDiscount(order.items)) > 0 ? (
                    <Typography>
                      - ${formatPrice(calculateDiscount(order.items))}
                    </Typography>
                  ) : (
                    "-"
                  )}
                </Stack>
              </Stack>
              {/*<Stack*/}
              {/*  direction="row"*/}
              {/*  alignItems="center"*/}
              {/*  justifyContent="space-between"*/}
              {/*>*/}
              {/*  <Typography color="textDisabled">Shipping fee</Typography>*/}
              {/*  <Stack direction="row" gap={1}>*/}
              {/*    <Typography>*/}
              {/*      $*/}
              {/*      {Number(2).toLocaleString("en-US", {*/}
              {/*        minimumFractionDigits: 2,*/}
              {/*      })}*/}
              {/*    </Typography>*/}
              {/*  </Stack>*/}
              {/*</Stack>*/}
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="textDisabled">Total</Typography>
                <Stack direction="row" gap={1}>
                  <Typography>${formatPrice(order.totalPrice)}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack maxWidth={700} width="100%">
            <Stack>
              <Stack
                maxWidth={400}
                p={2}
                bgcolor={gray[100]}
                borderRadius={1}
                position="relative"
                gap={0.5}
              >
                <Typography fontWeight={600}>Order Note</Typography>
                <Typography fontSize="14px" maxWidth={320}>
                  Please wrap the box with a wrapper, so the text is unreadable,
                  this is for birthday present
                </Typography>
                <EditIcon
                  sx={{
                    position: "absolute",
                    width: 16,
                    right: 10,
                    top: 5,
                    cursor: "pointer",
                  }}
                />
              </Stack>
            </Stack>

            <Stack mt={3} maxWidth={400}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: `2px solid ${grey[200]}`,
                  bgcolor: "transparent",
                }}
              >
                <Stack gap={2}>
                  <Typography fontWeight={600}>Customer</Typography>
                  <Stack
                    direction="row"
                    sx={{
                      gap: 1,
                      alignItems: "center",
                      borderColor: "divider",
                    }}
                  >
                    <Avatar
                      sizes="small"
                      alt={client ? client.username : "Riley Carter"}
                      src={client ? client.profile : ""}
                      sx={{ width: 36, height: 36 }}
                    />
                    <Box sx={{ mr: "auto" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, lineHeight: "16px" }}
                      >
                        {client ? client.username : "Riley Carter"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {client ? client.email : "riley@email.com"}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <br />
                <Divider />
                <br />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Shipping Address</Typography>
                  <EditIcon
                    sx={{
                      width: 16,
                      cursor: "pointer",
                    }}
                  />
                </Stack>
                <br />
                <Divider />
                <br />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Contact information</Typography>
                  <EditIcon
                    sx={{
                      width: 16,
                      cursor: "pointer",
                    }}
                  />
                </Stack>

                {client && (
                  <Stack gap={1} mt={1}>
                    <Stack direction="row">
                      <Chip label={client.email} />
                    </Stack>
                    <Stack direction="row">
                      <Chip label={formatCambodianPhoneNumber(client.phone)} />
                    </Stack>
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default OrderDetail;

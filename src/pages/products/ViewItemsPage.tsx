import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ButtonBuy from "../../components/Button/ButtonBuy.tsx";
import ButtonCart from "../../components/Button/ButtonCart.tsx";
import {
  IProduct,
  IProductResponse,
} from "../../services/types/ProductInterface.tsx";
import { useCallback, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../services/productApi.ts";
import { useNavigate } from "react-router-dom";

const ViewItemsPage = () => {
  const [products, setProducts] = useState<IProduct | undefined>();
  const limit = 10;
  const page = 1;

  // end point
  const { data, isLoading, isSuccess } = useGetAllProductsQuery({
    limit,
    page,
  });

  useEffect(() => {
    if (isSuccess) {
      setProducts(data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    products && (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "start" }}
        >
          {products.data.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id} width="auto">
              <PostCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
};

export default ViewItemsPage;

const PostCard = ({
  id,
  name,
  thumbnail,
  description,
  skuCode,
  price,
}: IProductResponse) => {
  const navigate = useNavigate();
  const navigationDetail = useCallback(
    () => navigate(`/item/${skuCode}/${id}`),
    [navigate],
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 2,
        maxHeight: 463,
        flexGrow: 1,
      }}
    >
      <CardMedia
        component="img"
        height="186"
        image={thumbnail ?? "https://via.placeholder.com/400x300"}
        alt={name}
        sx={{ cursor: "pointer" }}
        onClick={navigationDetail}
      />
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography variant="body3" component="div">
              {skuCode}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 1, // Limit to 2 lines
                textOverflow: "ellipsis",
                maxWidth: "300px", // Set a max width for the container
              }}
            >
              {name}
            </Typography>
          </Stack>

          <Typography variant="h6" component="div">
            ${price}
          </Typography>
        </Stack>
        <Typography
          variant="body3"
          color="text.secondary"
          maxHeight={100}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2, // Limit to 2 lines
            textOverflow: "ellipsis",
            maxWidth: "300px", // Set a max width for the container
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        <Stack
          width="100%"
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <ButtonCart />
          <ButtonBuy onClick={navigationDetail} />
        </Stack>
      </CardActions>
    </Card>
  );
};

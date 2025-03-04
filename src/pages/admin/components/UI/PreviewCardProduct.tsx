import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { IProductDataGrid } from "../../../../services/types/ProductInterface.tsx";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { store } from "../../../../redux.ts";
import {
  dispatchDeleteProductId,
  dispatchDeleteUserId,
} from "../../../../redux/application.ts";
import { Link, useNavigate } from "react-router-dom";
export interface IPreviewCardProductProps extends IProductDataGrid {
  type: string;
}

const PreviewCardProduct = (props: IPreviewCardProductProps) => {
  const actionsBtn = {
    ["product"]: {
      edit: `/admin/products/update/${props.id}${window.location.search}`,
      delete: () => store.dispatch(dispatchDeleteProductId(Number(props.id))),
    },
    ["client"]: {
      edit: `/admin/people/update/${props.id}${window.location.search}`,
      delete: () => store.dispatch(dispatchDeleteUserId(Number(props.id))),
    },
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.productThumbnail ?? ""}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ lineHeight: 1.8 }}
        >
          {props.productName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.productDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 1 }}>
        <Stack direction="row" alignItems="center">
          <Link to={actionsBtn["product"].edit}>
            <Button
              size="small"
              startIcon={
                <BorderColorRoundedIcon
                  fontSize="small"
                  color="info"
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Edit
            </Button>
          </Link>

          <Button
            size="small"
            onClick={() => actionsBtn["product"].delete()}
            startIcon={
              <DisabledByDefaultRoundedIcon
                fontSize="small"
                color="error"
                sx={{
                  cursor: "pointer",
                }}
              />
            }
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PreviewCardProduct;

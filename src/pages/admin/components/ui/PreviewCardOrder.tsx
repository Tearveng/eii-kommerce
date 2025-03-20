import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { store, useAppSelector } from "../../../../redux.ts";
import {
  dispatchDeleteProductId,
  dispatchDeleteUserId,
} from "../../../../redux/application.ts";
import { Link } from "react-router-dom";
import { IPreviewRow } from "../../../../redux/type.ts";
export interface IPreviewCardOrderProps {
  handleClose: () => void;
}

const PreviewCardOrder = (props: IPreviewCardOrderProps) => {
  const { previewOrder } = useAppSelector((state) => state.application);
  const actionsBtn = {
    ["product"]: {
      edit: `/admin/products/update/${product.id}${window.location.search}`,
      delete: () => {
        store.dispatch(dispatchDeleteProductId(Number(product.id)));
        props.handleClose();
      },
    },
    ["client"]: {
      edit: `/admin/people/update/${product.id}${window.location.search}`,
      delete: () => {
        store.dispatch(dispatchDeleteUserId(Number(product.id)));
        props.handleClose();
      },
    },
  };
  console.log("previewOrder", previewOrder);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/*<CardMedia*/}
      {/*  sx={{ height: 140 }}*/}
      {/*  image={product.productThumbnail ?? ""}*/}
      {/*  title="green iguana"*/}
      {/*/>*/}
      {/*<CardContent>*/}
      {/*  <Typography*/}
      {/*    gutterBottom*/}
      {/*    variant="h5"*/}
      {/*    component="div"*/}
      {/*    sx={{ lineHeight: 1.8 }}*/}
      {/*  >*/}
      {/*    {product.productName}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="body2" sx={{ color: "text.secondary" }}>*/}
      {/*    {product.productDescription}*/}
      {/*  </Typography>*/}
      {/*</CardContent>*/}
      {/*<CardActions sx={{ pt: 1 }}>*/}
      {/*  <Stack direction="row" alignItems="center">*/}
      {/*    <Link to={actionsBtn["product"].edit}>*/}
      {/*      <Button*/}
      {/*        onClick={props.handleClose}*/}
      {/*        size="small"*/}
      {/*        startIcon={*/}
      {/*          <BorderColorRoundedIcon*/}
      {/*            fontSize="small"*/}
      {/*            color="info"*/}
      {/*            sx={{*/}
      {/*              cursor: "pointer",*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        }*/}
      {/*      >*/}
      {/*        Edit*/}
      {/*      </Button>*/}
      {/*    </Link>*/}

      {/*    <Button*/}
      {/*      size="small"*/}
      {/*      onClick={() => actionsBtn["product"].delete()}*/}
      {/*      startIcon={*/}
      {/*        <DisabledByDefaultRoundedIcon*/}
      {/*          fontSize="small"*/}
      {/*          color="error"*/}
      {/*          sx={{*/}
      {/*            cursor: "pointer",*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Delete*/}
      {/*    </Button>*/}
      {/*  </Stack>*/}
      {/*</CardActions>*/}
    </Card>
  );
};

export default PreviewCardOrder;

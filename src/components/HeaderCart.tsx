import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, ButtonProps, IconButton } from "@mui/material";

const HeaderCart = (props: ButtonProps) => {
  const defaultStyle = {
    color: "primary.main",
    p: 0,
  };

  return (
    <IconButton {...props} sx={defaultStyle}>
      <Badge badgeContent={4} color="primary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default HeaderCart;

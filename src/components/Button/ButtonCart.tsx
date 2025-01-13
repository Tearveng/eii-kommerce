import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ButtonProps, IconButton } from "@mui/material";

const ButtonCart = (props: ButtonProps) => {
  const defaultStyle = {
    color: "primary.main",
    p: "4px 16px",
    border: "1px solid #00000030",
    borderRadius: 1,
    width: "80px",
  };

  return (
    <IconButton {...props} sx={defaultStyle}>
      <ShoppingCartOutlinedIcon />
    </IconButton>
  );
};

export default ButtonCart;

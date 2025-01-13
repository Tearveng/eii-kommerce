import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Button, ButtonProps } from "@mui/material";

const ButtonBuy = (props: ButtonProps) => {
  const defaultStyle = {
    flexGrow: 1,
    margin: 1,
    textTransform: "none",
    fontWeight: "light",
    boxShadow: "none",
    fontSize: 12,
  };
  return (
    <Button
      {...props}
      endIcon={<ArrowForwardIosOutlinedIcon sx={{ width: 14 }} />}
      size="medium"
      variant="contained"
      sx={defaultStyle}
    >
      Buy Now
    </Button>
  );
};

export default ButtonBuy;

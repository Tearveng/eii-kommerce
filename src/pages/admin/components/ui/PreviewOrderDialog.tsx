import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../../redux.ts";
import { useEffect, useState } from "react";
import PreviewCardProduct from "./PreviewCardProduct.tsx";
import PreviewCardOrder from "./PreviewCardOrder.tsx";

const PreviewOrderDialog = () => {
  const { previewOrder } = useAppSelector((state) => state.application);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (previewOrder) {
      setOpen(true);
    }
  }, [previewOrder]);

  return (
    <Dialog
      sx={{
        padding: 0,
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ visibility: "hidden" }}>X</Typography>
          <Typography variant="subtitle2" fontWeight={600} textAlign="center">
            Product
          </Typography>
          <Typography
            variant="subtitle2"
            textAlign="end"
            sx={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            X
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {previewOrder && (
          <PreviewCardOrder order={previewOrder} handleClose={handleClose} />
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default PreviewOrderDialog;

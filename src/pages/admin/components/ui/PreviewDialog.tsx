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

const PreviewDialog = () => {
  const { previewRow } = useAppSelector((state) => state.application);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (previewRow) {
      setOpen(true);
    }
  }, [previewRow]);

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
        {previewRow && (
          <PreviewCardProduct product={previewRow} handleClose={handleClose} />
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;

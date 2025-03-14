import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { store, useAppSelector } from "../../../../../redux.ts";
import { clearDeleteStockId } from "../../../../../redux/application.ts";
import { useDeleteStockMutation } from "../../../../../services/stockApi.ts";

const StockDeleteDialog = () => {
  const { deleteStockId } = useAppSelector((state) => state.application);
  const [deleteStock, { isLoading: deleteLoading }] =
    useDeleteStockMutation();

  const handleDeleteProduct = async () => {
    if (deleteStockId) {
      await deleteStock({ id: deleteStockId })
        .unwrap()
        .then(() => handleClose())
        .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    store.dispatch(clearDeleteStockId());
  };

  return (
    <Dialog
      open={Boolean(deleteStockId)}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this stock?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="small" onClick={handleClose}>
          Disagree
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          disabled={deleteLoading}
          autoFocus
          onClick={handleDeleteProduct}
          startIcon={
            deleteLoading && <CircularProgress color="inherit" size={14} />
          }
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDeleteDialog;

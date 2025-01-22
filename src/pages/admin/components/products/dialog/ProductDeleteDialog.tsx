import { useDeleteProductMutation } from "../../../../../services/productApi.ts";
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
import { clearDeleteProductId } from "../../../../../redux/application.ts";

const ProductDeleteDialog = () => {
  const { deleteProductId } = useAppSelector((state) => state.application);
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    if (deleteProductId) {
      await deleteProduct({ id: deleteProductId })
        .unwrap()
        .then(() => handleClose())
        .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    store.dispatch(clearDeleteProductId());
  };

  return (
    <Dialog
      open={Boolean(deleteProductId)}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this product?
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

export default ProductDeleteDialog;

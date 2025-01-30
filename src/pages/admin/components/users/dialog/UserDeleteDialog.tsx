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
import { clearDeleteUserId } from "../../../../../redux/application.ts";
import { useDeleteUserMutation } from "../../../../../services/adminApi.ts";

const UserDeleteDialog = () => {
  const { deleteUserId } = useAppSelector((state) => state.application);
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    if (deleteUserId) {
      await deleteUser({ id: deleteUserId })
        .unwrap()
        .then(() => handleClose())
        .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    store.dispatch(clearDeleteUserId());
  };

  return (
    <Dialog
      open={Boolean(deleteUserId)}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this user?
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
          onClick={handleDeleteUser}
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

export default UserDeleteDialog;

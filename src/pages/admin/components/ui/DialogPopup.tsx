import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
} from "@mui/material";

export interface IDialogPopupProps {
  dialogProps: DialogProps;
  dialogTitleProps: DialogTitleProps;
  dialogContentProps: DialogContentProps;
  dialogActionProps: DialogActionsProps;
  titleJsx: JSX.Element;
  contentJsx: JSX.Element;
  actionsJsx: JSX.Element;
}

const DialogPopup = (props: IDialogPopupProps) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props.dialogProps}
    >
      <DialogTitle id="alert-dialog-title" {...props.dialogTitleProps}>
        {props.titleJsx}
      </DialogTitle>
      <DialogContent {...props.dialogContentProps}>
        {props.contentJsx}
      </DialogContent>
      <DialogActions {...props.dialogActionProps}>
        {props.actionsJsx}
      </DialogActions>
    </Dialog>
  );
};

export default DialogPopup;

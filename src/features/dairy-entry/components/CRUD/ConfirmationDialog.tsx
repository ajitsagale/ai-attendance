import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

type ConfirmationDialogProps = {
  open: boolean; // Whether the dialog is open
  title?: string; // Title of the dialog
  message?: string; // Message to display in the dialog
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  onConfirm: () => void; // Function to call when the confirm button is clicked
  onCancel: () => void; // Function to call when the cancel button is clicked
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="confirmation-dialog">
      {title && (
        <DialogTitle id="confirmation-dialog-title">
          <Typography variant="h6">{title}</Typography>
        </DialogTitle>
      )}
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
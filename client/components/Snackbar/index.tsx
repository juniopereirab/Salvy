import {
  Alert,
  Snackbar as MUISnackbar,
  Slide,
  SlideProps,
} from "@mui/material";
import React from "react";

interface ISnackbar {
  message: string;
  open: boolean;
  severity: "success" | "info";
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const Snackbar: React.FC<ISnackbar> = ({
  message,
  open,
  severity,
  handleClose,
}) => {
  return (
    <MUISnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;

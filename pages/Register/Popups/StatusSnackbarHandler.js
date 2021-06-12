import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// idea: use this to process state information provided from register. This manages state of which alert should be open. 
// param: output message (String), alert type (String)
export default function StatusSnackbarHandler(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
      // console.log(event, reason);
      // console.log(open)
      setOpen(false);
      // console.log(open)
    };
    
    // console.log(props)
  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={props.alertType}>
          {props.message}
        </Alert>
      </Snackbar>
      /*
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
      */
  );
}
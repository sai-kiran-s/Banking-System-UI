import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../components/appbar';
import { useLocation } from 'react-router';
import { transferHandler } from '../store/transferReducer'
import { connect } from 'react-redux';
import { alertFailure } from '../store/alertReducer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function Transfer(props) {
  let loc1 = useLocation();
  let locreceiver;
  let locsender;
  if((loc1.receiver&&loc1.sender) ||(localStorage.getItem("locreceiver")&&localStorage.getItem('locsender')))
{
  if((loc1.receiver&&loc1.sender)){
    localStorage.setItem('locreceiver',loc1.receiver);
    localStorage.setItem('locsender',loc1.sender);
  }
  locreceiver = localStorage.getItem('locreceiver')
  locsender = localStorage.getItem("locsender")
}
else{
  props.alertFailure("Please select a receiver before transferring!");
  window.location.replace('/viewcustomers')
}
  
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  console.log(loc1.receiver);
  console.log(loc1);
  const transfer = (sender_acc_no, receiver_acc_no, amount) => {
    props.transferHandler(sender_acc_no, receiver_acc_no, amount)
  }

  
  return (
    <React.Fragment>
      <Appbar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>

          <Typography variant="h6" gutterBottom>
            Transfer Money
      </Typography>
          <Grid container spacing={3} style={{ marginTop: "2em" }}>
            <Grid item xs={12} >
              <TextField
                id="sender_account_no"
                name="sender_account_no"
                label="Sender Account Number"
                fullWidth
                value={locsender}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="receiver_account_no"
                name="receiver_account_no"
                label="Receiver Account Number"
                fullWidth
                value={locreceiver}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="amount"
                name="amount"
                label="Amount (in Rs.)"
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "1em" }}>
              <Button onClick={() => { if (parseInt(amount) <= 0) { props.alertFailure("Amount cannot be zero or negative!") } else { transfer(locsender, locreceiver, parseInt(amount)) } }}>
                Transfer
          </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    message: { ...state.transfer.message }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferHandler: (sender_acc_no, receiver_acc_no, amount) => {
      dispatch(transferHandler(sender_acc_no, receiver_acc_no, amount));
    },
    alertFailure: (msg) => {
      dispatch(alertFailure(msg));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
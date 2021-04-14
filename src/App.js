import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ViewCustomers from './pages/viewcustomers';
import Profile from './pages/profile';
import ViewCustomerExcept from './pages/viewcustomerexcept';
import Transfer from './pages/transfer';
import CustomerTransactions from './pages/customertransactions';
import AllTransactions from './pages/alltransactions';
import { alertFailure, alertSuccess, ClearAlert } from './store/alertReducer'
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useState } from 'react';

function App(props) {
  return (
    <div className="App">
      {props.message !== "" ? (
        <Dialog
          open={true}
          onClose={()=>props.ClearAlert()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>props.ClearAlert()} color="primary">
              OK
          </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/viewtransactions">
            <AllTransactions />
          </Route>
          <Route path="/viewcustomers">
            <ViewCustomers />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/viewcustomersexcept">
            <ViewCustomerExcept />
          </Route>
          <Route path="/viewcustomertransactions">
            <CustomerTransactions />
          </Route>
          <Route path="/transfer">
            <Transfer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    message: state.alert.message
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    alertFailure: (message) => { dispatch(alertFailure(message)) },
    alertSuccess: (message) => { dispatch(alertSuccess(message)) },
    ClearAlert: () => { dispatch(ClearAlert()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

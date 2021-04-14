import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../components/appbar';
import { Typography } from '@material-ui/core';
import Table from '../components/table';
import {custExceptFetchHandler} from '../store/customerReducer'
import { connect } from "react-redux";
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  main:{
  },
  heading:{
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textAlign:"center",
    fontFamily:"sans-serif", 
    fontSize:"2em",
    fontWeight:"500",
  }
}
));



const ViewCustomersExcept = (props) => {
  let loc = useLocation().state;
  const custFetch = () => {
    console.log(props.acc_no);
    props.custExceptFetchHandler(loc)
  }
  useEffect(() => {
    custFetch()
  }, [])
  const columns = ["Account Number","Email Id","Name"]
  const rows = [...props.customers]
  const classes = useStyles();

  return ( 
    <div className={classes.main}>
      <Appbar/>
      <Typography variant="h6" className={classes.heading}>
        Transfer To
        </Typography>
        <Table columns={columns} rows={rows} acc_no={props.acc_no} label="viewcustomersexcept"/>
    </div>
   );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    customers:[...state.customer.customers],
    acc_no:state.profile.customer[0]?state.profile.customer[0].account_number:localStorage.getItem('acc_no')
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    custExceptFetchHandler: (id) => {
      dispatch(custExceptFetchHandler(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomersExcept);
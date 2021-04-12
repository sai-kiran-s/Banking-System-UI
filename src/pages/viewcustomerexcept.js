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
    backgroundColor:"#D5D862",
    minHeight:"100vh"
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
    console.log(loc);
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
        <Table columns={columns} rows={rows} label="viewcustomersexcept"/>
    </div>
   );
}
const mapStateToProps = (state) => {
  return {
    customers:[...state.customer.customers]
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
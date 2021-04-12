import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../components/appbar';
import { Typography } from '@material-ui/core';
import Table from '../components/table';
import {custFetchHandler} from '../store/customerReducer'
import { connect } from "react-redux";

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



const ViewCustomers = (props) => {
  useEffect(()=>{
    props.custFetchHandler();
  },[])
  const columns = ["Account Number","Email Id","Name"]
  const rows = [...props.customers]
  const classes = useStyles();
  return ( 
    <div className={classes.main}>
      <Appbar/>
      <Typography variant="h6" className={classes.heading}>
        Customers
        </Typography>
        <Table columns={columns} rows={rows} label="viewcustomers"/>
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
    custFetchHandler: () => {
      dispatch(custFetchHandler());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomers);
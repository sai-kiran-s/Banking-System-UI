import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Appbar from '../components/appbar';
import Table from '../components/table';
import {transFetchHandler} from '../store/transactionReducer'
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

function Home(props) {
  useEffect(()=>{
    props.transFetchHandler()
      },[])
  const classes = useStyles();
  const columns = ["Sender Account No.","Receiver Account No.","Date","Amount"]
  const rows = [...props.transactions]
  return (
    <div className={classes.main}>
        <Appbar/>
        <Typography variant="h6" className={classes.heading}>
          Past Transactions
        </Typography>
        <Table columns={columns} rows={rows}/>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    transactions:[...state.transaction.transactions]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    transFetchHandler: () => {
      dispatch(transFetchHandler());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
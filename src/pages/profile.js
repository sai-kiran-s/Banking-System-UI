import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Appbar from '../components/appbar';
import { profFetchHandler } from '../store/profileReducer'
import { connect } from "react-redux";
import { Avatar, Button, Paper } from '@material-ui/core';
import img from '../static/1.jpg'
import { Link, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  main: {
  },
  heading: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: "2em",
    fontWeight: "500",
  },
  paper: {
    minHeight: "60vh",
    display:"flex",
    flexDirection: "column"
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}
));

function Profile(props) {
  let loc = useLocation().state;
  const profFetch = () => {
    console.log(loc);
    props.profFetchHandler(loc)
  }
  useEffect(() => {
    localStorage.removeItem('locreceiver')
    console.log("hello")
    profFetch()
  }, [])
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Appbar />
      <Typography variant="h6" className={classes.heading}>
        Profile
        </Typography>
      <div style={{
        marginTop: "1em",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
      }}>

        <Paper className={classes.paper} variant="outlined" elevation={3} >
          <div style={{
            marginTop: "1em",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <Avatar src={img} className={classes.large} />
            </div>

            <div style={{
            marginTop: "1em",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <Typography>Name: {props.profile.name}</Typography><br/>
            <Typography>Email Address: {props.profile.email_id}</Typography><br/>
            <Typography>Account Number: {props.profile.account_number}</Typography><br/>
            <Typography>Account Balance: {props.profile.account_balance}</Typography>
          </div>
          <div style={{
            marginTop: "4em",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}>

          <div style={{
            display:"flex",
            flexDirection: "row"
          }}>
            <Link  style={{textDecoration:"none",color:"white"}} to={{pathname:'/viewcustomertransactions',state:props.profile.account_number}}>
            <Button color="primary">View Transactions</Button>
            </Link>
            <Link  style={{textDecoration:"none",color:"white"}} to={{pathname:'/viewcustomersexcept',state:props.profile.account_number}}>
            <Button color="primary">Transfer Money</Button>
            </Link>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state.profile);
  return {
    profile: {...state.profile.customer[0]}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profFetchHandler: (id) => {
      dispatch(profFetchHandler(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
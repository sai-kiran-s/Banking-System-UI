import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor:"#D5D862",
    minHeight:"100vh"
  },
  table: {
    maxWidth:'500',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:"start"
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

const Appbar = () => {
  const classes = useStyles();
  return ( 
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Banking System
            </Typography>
            <Link to="/home" style={{textDecoration:"none",color:"white"}}><Button color="inherit">Home</Button></Link>
            <Link to="/viewcustomers" style={{textDecoration:"none",color:"white"}}><Button color="inherit">View Customers</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    </div>
   );
}
 
export default Appbar;
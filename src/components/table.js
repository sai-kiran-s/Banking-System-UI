import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import { profFetchHandler } from '../store/profileReducer'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor:"#D5D862",
    minHeight:"100vh"
  },
  table: {
    maxWidth:'500',
    border:'solid'
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const TableComponent = (props) => {
  console.log(props.columns)
  const classes = useStyles();
  console.log(props.rows.length);
  return ( 
    <div style={{margin:'2%'}}>
      {props.rows.length === 0?(
        <Typography>
          Looks like this account is yet to have a transaction!
        </Typography>
      ):(
        <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table}>
          <TableHead>
          <TableRow>
            {props.columns.map((column)=>(
            <StyledTableCell align="left">{column}</StyledTableCell>
            ))}
            {props.label === "viewcustomers"||"viewcustomersexcept"?<StyledTableCell align="left"></StyledTableCell>:null}
          </TableRow>
          </TableHead>
          <TableBody>
          
          {props.label === "viewcustomers"?(
          props.rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">{row.account_number}</StyledTableCell>
                <StyledTableCell align="left">{row.email_id}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">
                <Link  style={{textDecoration:"none",color:"white"}}   to={{     
         pathname: '/profile',
         state:row.account_number
        }
  }> <Button color="primary">View</Button></Link></StyledTableCell>
              
              </StyledTableRow>
            ))

            ):props.label === "viewcustomersexcept"?(
              props.rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.account_number}</StyledTableCell>
                <StyledTableCell align="left">{row.email_id}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                <Link  style={{textDecoration:"none",color:"white"}}   to={{     
         pathname: `/transfer`,
         receiver:row.account_number,
         sender:props.acc_no
        }
        
  }> <Button color="primary">Transfer</Button></Link></StyledTableCell>
                  </StyledTableRow>
              ))

            ):(props.rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.sender_account_number}</StyledTableCell>
                  <StyledTableCell align="left">{row.receiver_account_number}</StyledTableCell>
                  <StyledTableCell align="left">{new Date(row.datetime).toUTCString()}</StyledTableCell>
                  <StyledTableCell align="left">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  </StyledTableRow>
              ))
            )}
        </TableBody>
        </Table>
      </TableContainer>
      )}
      
        </div>
   );
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    profFetchHandler: () => {
      dispatch(profFetchHandler());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
 
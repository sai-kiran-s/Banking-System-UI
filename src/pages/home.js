import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Icon from '@material-ui/core/Icon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { CardContent } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:theme.palette.grey[200],
  },
  large: {
    fontSize:"400%"
  },
}));

const tiers = [
  {
    title: 'View Customers',
    description: [],
    buttonVariant: 'contained',
  },
  {
    title: 'View Transactions',
    description: [],
    buttonVariant: 'contained',
  },
];

export default function Home() {
  const classes = useStyles();
  useEffect(()=>{
    localStorage.removeItem('locreceiver')
  },[])
  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Banking System
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          This application shows all customers who use the application, transactions made and also helps in making transfers 
      </Typography>
      </Container>
      <Container style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"80%"}} maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>

                <Icon>
                {tier.title==="View Customers"?<PeopleAltIcon fontSize="large"/>:<ReceiptIcon fontSize="large"/>}
                </Icon>
                </CardContent>
                <CardActions>
                  <a style={{width:"100%",textDecoration:"none",color:"white"}} href={tier.title==="View Customers"? "/viewcustomers":"/viewtransactions"}>
                  <Button fullWidth variant={tier.buttonVariant} color="secondary">
                    View
                  </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
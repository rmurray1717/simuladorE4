import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const dollarValue = (value) => {
    return `$${value}`;
}

const percentValue = (value) => {
    return `${value}%`;
}

const yearValue = (value) => {
    if (value > 1) {
        return `${value} years`;
    } else {
        return `${value} year`;
    }

}

export default function Calculator() {
  const classes = useStyles();
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [paymentSchedule, setPaymentSchedule] = useState('BIWKLY');
  const [downPayment, setDownPayment] = useState(5);
  const [interestRate, setInterestRate] = useState(2);
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [mortgatePayment, setMortgagePayment] = useState(1);

  const handlePaymentScheduleChange = (event) => {
    setPaymentSchedule(event.target.value);
  };

  const handlePropertyPriceChange = (event, newValue) => {
    setPropertyPrice(newValue);
  };

  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  const handleAmortizationPeriodChange = (event, newValue) => {
    setAmortizationPeriod(newValue);
  };
  const handleSubmit = e => {
    console.log('here');
    e.preventDefault();
    console.log('here');
    console.log(JSON.stringify({
        "propertyPrice": propertyPrice,
        "downPaymentPercent": downPayment,
        "interestRatePercent": interestRate,
        "amortizationPeriod": amortizationPeriod,
        "paymentSchedule": paymentSchedule
    }));
    fetch('https://sheltered-escarpment-94741.herokuapp.com/v1/calculator', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            "propertyPrice": propertyPrice,
            "downPaymentPercent": downPayment,
            "interestRatePercent": interestRate,
            "amortizationPeriod": amortizationPeriod,
            "paymentSchedule": paymentSchedule
        })
    })
    .then(response => response.json())
    .then(result => {
        setMortgagePayment(result.paymentPerSchedule);
    });
  }

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Mortgage Calculator
        </Typography>
        <Typography component="h2" variant="h5">
          ${mortgatePayment}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Typography id="property-price" gutterBottom>
                    Property Price
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Slider
                    value={propertyPrice}
                    onChange={handlePropertyPriceChange}
                    getAriaValueText={dollarValue}
                    aria-labelledby="property-price"
                    step={1000}
                    min={400000}
                    max={2000000}
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="property-price" gutterBottom>
                    {propertyPrice}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="down-payment" gutterBottom>
                    Down Payment
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    getAriaValueText={percentValue}
                    aria-labelledby="down-payment"
                    step={1}
                    min={5}
                    max={100}
                    valueLabelDisplay="auto"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="property-price" gutterBottom>
                    {downPayment}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="interest-rate" gutterBottom>
                    Interest Rate
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    getAriaValueText={percentValue}
                    aria-labelledby="interest-rate"
                    step={0.01}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="property-price" gutterBottom>
                    {interestRate}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="amortization-period" gutterBottom>
                    Amortization Period
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={amortizationPeriod}
                    onChange={handleAmortizationPeriodChange}
                    getAriaValueText={yearValue}
                    aria-labelledby="amortization-period"
                    step={5}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="property-price" gutterBottom>
                    {amortizationPeriod}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography id="payment-schedule" gutterBottom>
                    Payment Schedule
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="payment-schedule" name="payment-schedule" value={paymentSchedule} onChange={handlePaymentScheduleChange}>
                        <FormControlLabel value="BIWKLY" control={<Radio />} label="Biweekly" />
                        <FormControlLabel value="ACC_BIWKLY" control={<Radio />} label="Accelerated Biweekly" />
                        <FormControlLabel value="MTHLY" control={<Radio />} label="Monthly" />
                    </RadioGroup>
                </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Calculate
          </Button>
          <Grid container justify="flex-end">
            <Grid item>

            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
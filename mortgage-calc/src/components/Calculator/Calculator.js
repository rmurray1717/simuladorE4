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

export default function Calculator(props) {
    const classes = useStyles();
    return <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
    <Typography component="h1" variant="h5">
        Mortgage Calculator
    </Typography>
    <Typography component="h2" variant="h5">
        ${props.mortgatePayment}
    </Typography>
    <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
            <Typography id="property-price" gutterBottom>
                Property Price
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Slider
                value={props.propertyPrice}
                onChange={props.handlePropertyPriceChange}
                getAriaValueText={props.dollarValue}
                aria-labelledby="property-price"
                step={1000}
                min={400000}
                max={2000000}
            />
        </Grid>
        <Grid item xs={6} sm={2}>
            <Typography id="property-price" gutterBottom>
                {props.propertyPrice}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography id="down-payment" gutterBottom>
                Down Payment
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Slider
                value={props.downPayment}
                onChange={props.handleDownPaymentChange}
                getAriaValueText={props.percentValue}
                aria-labelledby="down-payment"
                step={1}
                min={5}
                max={100}
                valueLabelDisplay="auto"
            />
        </Grid>
        <Grid item xs={6} sm={2}>
            <Typography id="property-price" gutterBottom>
                {props.downPayment}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography id="interest-rate" gutterBottom>
                Interest Rate
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Slider
                value={props.interestRate}
                onChange={props.handleInterestRateChange}
                getAriaValueText={props.percentValue}
                aria-labelledby="interest-rate"
                step={0.01}
                min={0}
                max={10}
                valueLabelDisplay="auto"
            />
        </Grid>
        <Grid item xs={6} sm={2}>
            <Typography id="property-price" gutterBottom>
                {props.interestRate}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography id="amortization-period" gutterBottom>
                Amortization Period
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Slider
                value={props.amortizationPeriod}
                onChange={props.handleAmortizationPeriodChange}
                getAriaValueText={props.yearValue}
                aria-labelledby="amortization-period"
                step={5}
                min={5}
                max={30}
                valueLabelDisplay="auto"
            />
        </Grid>
        <Grid item xs={6} sm={2}>
            <Typography id="property-price" gutterBottom>
                {props.amortizationPeriod}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography id="payment-schedule" gutterBottom>
                Payment Schedule
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="payment-schedule" name="payment-schedule" value={props.paymentSchedule} onChange={props.handlePaymentScheduleChange}>
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
        <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={props.handleReset}
        >
        Reset
        </Button>
        <Grid container justify="flex-end">
        <Grid item>

        </Grid>
        </Grid>
    </form>
    </div>
</Container>
};
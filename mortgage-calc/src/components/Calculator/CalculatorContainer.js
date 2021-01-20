import React, { useState } from 'react';
import Calculator from './Calculator.js';

export default function CalculatorContainer() {
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [paymentSchedule, setPaymentSchedule] = useState('BIWKLY');
  const [downPayment, setDownPayment] = useState(5);
  const [interestRate, setInterestRate] = useState(2);
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [mortgatePayment, setMortgagePayment] = useState(1);

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

  const handleReset = () => {
    setPropertyPrice(0);
    setDownPayment(5);
    setInterestRate(0);
    setAmortizationPeriod(5);
    setPaymentSchedule('');
    setMortgagePayment(0);
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch('https://sheltered-escarpment-94741.herokuapp.com/v1/calculator', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            "propertyPrice": propertyPrice,
            "downPayment": downPayment,
            "interestRate": interestRate,
            "amortizationPeriod": amortizationPeriod,
            "paymentSchedule": paymentSchedule
        })
    })
    .then(response => response.json())
    .then(result => {
        setMortgagePayment(result.paymentPerSchedule);
    });
  }

  return <Calculator 
      propertyPrice={propertyPrice} 
      downPayment={downPayment} 
      interestRate={interestRate} 
      amortizationPeriod={amortizationPeriod} 
      paymentSchedule={paymentSchedule}
      handleReset={handleReset}
      handleAmortizationPeriodChange={handleAmortizationPeriodChange}
      handleDownPaymentChange={handleDownPaymentChange}
      handlePropertyPriceChange={handlePropertyPriceChange}
      handleInterestRateChange={handleInterestRateChange}
      handlePaymentScheduleChange={handlePaymentScheduleChange}
      mortgatePayment={mortgatePayment}
      dollarValue={dollarValue}
      yearValue={yearValue}
      percentValue={percentValue}
  />;

}
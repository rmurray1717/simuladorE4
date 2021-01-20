import React, { useState } from 'react';
import Calculator from './Calculator.js';
import { calculate } from '../../services/mortgage.js';

export default function CalculatorContainer() {
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [paymentSchedule, setPaymentSchedule] = useState('BIWKLY');
  const [downPayment, setDownPayment] = useState(5);
  const [interestRate, setInterestRate] = useState(2);
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [province, setProvince] = useState('BC');
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let result = await calculate({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province});
    setMortgagePayment(result.paymentPerSchedule);
  }

  return <Calculator 
      propertyPrice={propertyPrice} 
      downPayment={downPayment} 
      interestRate={interestRate} 
      amortizationPeriod={amortizationPeriod} 
      paymentSchedule={paymentSchedule}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
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
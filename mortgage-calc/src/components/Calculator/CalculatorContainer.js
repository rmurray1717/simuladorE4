import React, { useState } from 'react';
import Calculator from './Calculator.js';
import { calculate } from '../../services/mortgage.js';
import  { strings } from '../../lang.js';

export default function CalculatorContainer() {
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [paymentSchedule, setPaymentSchedule] = useState('BIWKLY');
  const [downPayment, setDownPayment] = useState(5);
  const [interestRate, setInterestRate] = useState(2);
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [province, setProvince] = useState('BC');
  const [mortgagePayment, setMortgagePayment] = useState('');
  const [mortgagePaymentResult, setMortgagePaymentResult] = useState('--');
  const [isLoading, setIsLoading] = useState(false);

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

  const getScheduleLabel = (value) => {
    switch (value) {
      case 'BIWKLY':
        return strings.biweekly;
      case 'MTHLY':
        return strings.monthly;
      case 'ACC_BIWKLY':
        return strings.accBiweekly;
      default:
        return '';
    }
  }
  
  const generateMortgagePaymentResults = (value) => {
    if (value.length === 0) {
      return '';
    }

    let scheduleLabel = getScheduleLabel(paymentSchedule);
    let formattedString = strings.formatString(strings.mortgagePaymentResult, value, scheduleLabel);
    setMortgagePaymentResult(formattedString);
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
    setMortgagePayment('');
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    let result = await calculate({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province});
    let pps = result.paymentPerSchedule;
    setIsLoading(false);
    setMortgagePayment(pps);
    generateMortgagePaymentResults(pps);
  }

  return <Calculator 
      propertyPrice={propertyPrice} 
      downPayment={downPayment} 
      interestRate={interestRate} 
      amortizationPeriod={amortizationPeriod} 
      paymentSchedule={paymentSchedule}
      isLoading={isLoading}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      handleAmortizationPeriodChange={handleAmortizationPeriodChange}
      handleDownPaymentChange={handleDownPaymentChange}
      handlePropertyPriceChange={handlePropertyPriceChange}
      handleInterestRateChange={handleInterestRateChange}
      handlePaymentScheduleChange={handlePaymentScheduleChange}
      mortgagePayment={mortgagePayment}
      dollarValue={dollarValue}
      yearValue={yearValue}
      percentValue={percentValue}
      mortgagePaymentResult={mortgagePaymentResult}
  />;

}
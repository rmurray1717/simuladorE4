const mapRequestBody = ({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province}) => {
    return {
        propertyPrice, 
        downPayment: downPayment/100 * propertyPrice, 
        interestRate: interestRate/100, 
        amortizationPeriod, 
        paymentSchedule, 
        province
    };
}

export const calculate  = async ({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province}) => {
    const response = await fetch('https://sheltered-escarpment-94741.herokuapp.com/mortgage/v1/calculator', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapRequestBody({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province}))
    });
    if (response.ok) {
        const responseJson = await response.json();
        return responseJson;
    } else {
        const responseJson = await response.json();
        return Promise.reject(responseJson);
    }
}

export const calculate  = async ({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province}) => {
    const response = await fetch('https://sheltered-escarpment-94741.herokuapp.com/v1/calculator', {
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
                "paymentSchedule": paymentSchedule,
                "province": province
        })
    });

    const responseJson = await response.json();
    return responseJson;
}

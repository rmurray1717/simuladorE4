import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import fetchMock from "fetch-mock";
import CalculatorContainer from './CalculatorContainer.js';

describe('Test Calcuator Container', () => {
 
    afterEach(() => {
        cleanup();
        fetchMock.restore();
    });

    test('Should match calculator snapshot', () => {
        const { asFragment } = render(<CalculatorContainer />)
        
        expect(asFragment(<CalculatorContainer />)).toMatchSnapshot();
     });
     
    test('Should render calculated mortgage payment after submit', async () => {
        fetchMock.mock('https://sheltered-escarpment-94741.herokuapp.com/v1/calculator', {
            body: { paymentPerSchedule: 1000 },
            status: 200
        });
        const { getByTestId, findByText } = render(<CalculatorContainer />);

        fireEvent.click(getByTestId('calculate-btn'));

        const mortgagePayment = await findByText('$1000');      
        expect(mortgagePayment).toBeInTheDocument();
     });
     
     test('Should clear after reset', () => {
         const { getByTestId } = render(<CalculatorContainer />); 
         
         fireEvent.click(getByTestId('reset-btn'));
     
         expect(getByTestId('mortgage-payment')).toHaveTextContent('$0');
     });
});
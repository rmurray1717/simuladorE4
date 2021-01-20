import '@testing-library/jest-dom';
import fetchMock from "fetch-mock";
import { calculate } from './mortgage.js';

describe('Test Mortgage Calculator Service', () => {
    const testMortgageInput = {
        propertyPrice: 800000, 
        downPayment: 80000, 
        interestRate: 0.05, 
        amortizationPeriod: 10, 
        paymentSchedule: 'BIWKLY', 
        province: 'BC'
    }
    const TEST_URL = 'https://sheltered-escarpment-94741.herokuapp.com/v1/calculator';

    afterEach(() => {
        fetchMock.restore();
    });
     
    test('Should return json result if successful', async () => {
        const testResponse = { paymentPerSchedule: '1000' };
        fetchMock.mock(TEST_URL, {
            body: testResponse,
            status: 200
        });
    
        const response = await calculate(testMortgageInput);

        expect(response).toEqual(testResponse);
    });

    test('Should throw error if failed', async () => {
        fetchMock.mock(TEST_URL, {
            status: 400
        });
        try {
            await calculate(testMortgageInput);
        } catch (err) {
            expect(err.statusText).toEqual('Bad Request');
        }
        
    });
     
});

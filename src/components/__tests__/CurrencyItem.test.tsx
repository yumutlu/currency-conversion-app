import React from 'react';
import { render } from '@testing-library/react-native';
import CurrencyItem from '../CurrencyItem';

describe('CurrencyItem', () => {
    const mockItem = {
        code: 'USD',
        name: 'United States Dollar',
        rate: 1.0,
        date: '2023-04-20T12:00:00Z',
    };

    it('renders correctly', () => {
        const { getByText } = render(<CurrencyItem item={mockItem} />);

        expect(getByText('USD')).toBeTruthy();
        expect(getByText('United States Dollar')).toBeTruthy();
        expect(getByText('Rate: 1.0000')).toBeTruthy();
        expect(getByText(/Last update:/)).toBeTruthy();
    });

    it('applies highlight style when isHighlight prop is true', () => {
        const { getByTestId } = render(<CurrencyItem item={mockItem} isHighlight />);
        const container = getByTestId('currency-item-container');

        expect(container.props.style).toContainEqual(expect.objectContaining({ backgroundColor: expect.any(String) }));
    });
});
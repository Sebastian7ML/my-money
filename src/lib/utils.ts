/**
     * Formats a number of cents into a currency string.
     * @param amountInCents The amount in cents (e.g., 125450).
     * @returns A formatted string (e.g., "$1,254.50").
     */

    export function formatCurrency(amountInCents: number): string {
      const dollars = amountInCents / 100;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(dollars);
    }
    /**
     * Formats a number of cents into a currency string.
     * @param amountInCents The amount in cents (e.g., 125450).
     * @returns A formatted string (e.g., "€1,254.50").
     */    export function formatCurrency(amountInCents: number): string {
      const dollars = amountInCents / 100;
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(dollars);
    }





    import { Transaction, Category } from '@/types';

    // A vibrant color palette for our charts
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    export function getSpendingByCategory(transactions: Transaction[], categories: Category[]) {
      // 1. Filter for only expense transactions
      const expenseTransactions = transactions.filter(t => t.amount < 0);

      // 2. Group transactions by category and sum their amounts
      const spendingByCategory = expenseTransactions.reduce((acc, transaction) => {
        const { categoryId, amount } = transaction;
        // We use the absolute value for spending
        const currentAmount = acc[categoryId] || 0;
        acc[categoryId] = currentAmount + Math.abs(amount);
        return acc;
      }, {} as Record<string, number>);

      // 3. Convert the grouped data into the format Recharts expects
      const chartData = Object.entries(spendingByCategory).map(([categoryId, totalAmount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          name: category?.name || 'Unknown',
          value: totalAmount,
        };
      });

      return chartData;
    }
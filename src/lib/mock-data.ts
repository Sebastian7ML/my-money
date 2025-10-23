import { Account, Category, Transaction } from '@/types';

export const mockAccounts: Account[] = [
  { id: 'acc_1', name: 'Main Checking', balance: 125450 }, // $1,254.50
  { id: 'acc_2', name: 'Savings', balance: 500000 }, // $5,000.00
  { id: 'acc_3', name: 'Visa Credit Card', balance: -25120 }, // -$251.20
];

export const mockCategories: Category[] = [
  // Income
  { id: 'cat_1', name: 'Salary', type: 'income' },
  { id: 'cat_2', name: 'Freelance', type: 'income' },
  // Expenses
  { id: 'cat_3', name: 'Groceries', type: 'expense' },
  { id: 'cat_4', name: 'Rent', type: 'expense' },
  { id: 'cat_5', name: 'Utilities', type: 'expense' },
  { id: 'cat_6', name: 'Dining Out', type: 'expense' },
];

export const mockTransactions: Transaction[] = [
  { id: 'txn_1', amount: 250000, description: 'October Salary', date: '2023-10-25T09:00:00Z', accountId: 'acc_1', categoryId: 'cat_1' },
  { id: 'txn_2', amount: -8523, description: 'Whole Foods', date: '2023-10-24T18:30:00Z', accountId: 'acc_1', categoryId: 'cat_3' },
  { id: 'txn_3', amount: -150000, description: 'Monthly Rent', date: '2023-10-01T00:00:00Z', accountId: 'acc_1', categoryId: 'cat_4' },
  { id: 'txn_4', amount: -6750, description: 'Electric Bill', date: '2023-10-20T12:00:00Z', accountId: 'acc_1', categoryId: 'cat_5' },
  { id: 'txn_5', amount: -4500, description: 'Pizza Night', date: '2023-10-22T20:00:00Z', accountId: 'acc_3', categoryId: 'cat_6' },
  { id: 'txn_6', amount: 50000, description: 'Website Project', date: '2023-10-18T14:00:00Z', accountId: 'acc_1', categoryId: 'cat_2' },
];
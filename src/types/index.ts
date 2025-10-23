export type TransactionType = 'income' | 'expense';

export interface Account {
  id: string;
  name: string;
  balance: number; // in cents, to avoid floating point issues
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  amount: number; // in cents
  description: string;
  date: string; // ISO 8601 format, e.g., "2023-10-27T10:00:00Z"
  accountId: string;
  categoryId: string;
}
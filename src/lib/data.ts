import { Account, Transaction } from '@/types';
import { mockAccounts, mockTransactions } from './mock-data';

// A helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Global state to persist transactions across requests during development
// In production, this would be a database
declare global {
  var transactionsStore: Transaction[] | undefined;
}

// Initialize the global store with mock data if it doesn't exist
if (!global.transactionsStore) {
  global.transactionsStore = [...mockTransactions];
}

/**
 * Simulates fetching a list of accounts from an API.
 */
export async function getAccounts(): Promise<Account[]> {
  // Simulate a 500ms network delay
  await delay(500);
  return mockAccounts;
}

/**
 * Simulates fetching a list of transactions from an API.
 */
export async function getTransactions(): Promise<Transaction[]> {
  // Simulate a 700ms network delay
  await delay(700);
  // Return a copy to prevent external mutations
  return [...(global.transactionsStore || [])];
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> {
  // Simulate network delay
  await delay(300);
  
  // Create a new transaction with ID and current date
  const newTransaction: Transaction = {
    ...transaction,
    id: `txn_${Date.now()}`, // Simple unique ID based on timestamp
    date: new Date().toISOString(), // Current date in ISO format
  };
  
  // Add to our global store
  if (global.transactionsStore) {
    global.transactionsStore.unshift(newTransaction); // Add to the beginning of the array
  }
  
  return newTransaction;
}
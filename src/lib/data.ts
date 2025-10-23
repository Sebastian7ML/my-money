import { Account, Transaction } from '@/types';
import { mockAccounts, mockTransactions } from './mock-data';

// A helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
  return mockTransactions;
}
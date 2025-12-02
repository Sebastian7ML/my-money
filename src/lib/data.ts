import { Account, Transaction } from '@/types';
import { mockAccounts, mockTransactions, mockCategories } from './mock-data';

// A helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Global state to persist transactions and accounts across requests during development
// In production, this would be a database
declare global {
  var transactionsStore: Transaction[] | undefined;
  var accountsStore: Account[] | undefined;
}

// Initialize the global stores with mock data if they don't exist
if (!global.transactionsStore) {
  global.transactionsStore = [...mockTransactions];
}

if (!global.accountsStore) {
  global.accountsStore = [...mockAccounts];
}

/**
 * Ensure global stores are initialized. Called at the start of each operation.
 */
export function ensureStoresInitialized(): void {
  if (!global.transactionsStore) {
    global.transactionsStore = [...mockTransactions];
  }
  if (!global.accountsStore) {
    global.accountsStore = [...mockAccounts];
  }
}

/**
 * Simulates fetching a list of accounts from an API.
 */
export async function getAccounts(): Promise<Account[]> {
  // Simulate a 500ms network delay
  await delay(500);
  ensureStoresInitialized();
  // Return a copy to prevent external mutations
  return [...(global.accountsStore || [])];
}

/**
 * Simulates fetching a list of transactions from an API.
 */
export async function getTransactions(): Promise<Transaction[]> {
  // Simulate a 700ms network delay
  await delay(700);
  ensureStoresInitialized();
  // Return a copy to prevent external mutations
  return [...(global.transactionsStore || [])];
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  // Simulate a 300ms network delay
  await delay(300);
  
  ensureStoresInitialized();
  // Find the transaction in our global store
  if (global.transactionsStore) {
    const transaction = global.transactionsStore.find(t => t.id === id);
    return transaction || null;
  }
  
  return null;
}

/**
 * Updates the balance of an account in the global store
 */
export async function updateAccountBalance(accountId: string, amountChange: number): Promise<void> {
  ensureStoresInitialized();
  if (global.accountsStore) {
    const accountIndex = global.accountsStore.findIndex(account => account.id === accountId);
    if (accountIndex !== -1) {
      global.accountsStore[accountIndex].balance += amountChange;
    }
  }
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> {
  // Simulate network delay
  await delay(300);
  
  ensureStoresInitialized();
  // Create a new transaction with ID and current date
  // Normalize amount sign based on the category type (expenses should be negative)
  const category = mockCategories.find(c => c.id === transaction.categoryId);
  const signedAmount = category && category.type === 'expense'
    ? -Math.abs(transaction.amount)
    : Math.abs(transaction.amount);

  const newTransaction: Transaction = {
    ...transaction,
    amount: signedAmount,
    id: `txn_${Date.now()}`, // Simple unique ID based on timestamp
    date: new Date().toISOString(), // Current date in ISO format
  };
  
  // Add to our global store
  if (global.transactionsStore) {
    global.transactionsStore.unshift(newTransaction); // Add to the beginning of the array
    
    // Update the account balance
    await updateAccountBalance(transaction.accountId, signedAmount);
  }
  
  return newTransaction;
}
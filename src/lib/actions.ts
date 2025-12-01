'use server';

import { Transaction } from '@/types';
import { addTransaction } from './data';

/**
 * Server action to add a new transaction
 * This must be a server action to properly update server state
 */
export async function createTransaction(
  transactionData: Omit<Transaction, 'id' | 'date'>
): Promise<Transaction> {
  try {
    const newTransaction = await addTransaction(transactionData);
    return newTransaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
}

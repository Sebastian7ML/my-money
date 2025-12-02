'use server';

import { Transaction } from '@/types';
import { addTransaction, updateAccountBalance, ensureStoresInitialized } from './data';
import { mockCategories } from './mock-data';

/**
 * Server action to add a new transaction
 * This must be a server action to properly update server state
 */
export async function createTransaction(
  transactionData: Omit<Transaction, 'id' | 'date'>
): Promise<Transaction> {
  try {
    console.log('[actions] createTransaction', transactionData);
    const newTransaction = await addTransaction(transactionData);
    return newTransaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
}

export async function updateTransaction(
  id: string,
  transactionData: Omit<Transaction, 'id' | 'date'>
): Promise<Transaction | null> {
  try {
    console.log('[actions] updateTransaction', { id, transactionData });
    ensureStoresInitialized();
    console.log('[actions] transactionsStore after init:', global.transactionsStore?.map(t => ({ id: t.id, desc: t.description })));
    // In a real app, this would be a database call
    if (global.transactionsStore && global.accountsStore) {
      const index = global.transactionsStore.findIndex(
        transaction => transaction.id === id
      );
      console.log('[actions] found index:', index, 'for id:', id);
      
      if (index !== -1) {
        const oldTransaction = global.transactionsStore[index];
        
        // Revert the old transaction's effect on the account balance
        await updateAccountBalance(oldTransaction.accountId, -oldTransaction.amount);

        // Determine sign for the new amount based on the category type
        const category = mockCategories.find(c => c.id === transactionData.categoryId);
        const signedNewAmount = category && category.type === 'expense'
          ? -Math.abs(transactionData.amount)
          : Math.abs(transactionData.amount);

        // Apply the new transaction's effect on the account balance
        await updateAccountBalance(transactionData.accountId, signedNewAmount);

        // Update the transaction (store signed amount)
        global.transactionsStore[index] = {
          ...global.transactionsStore[index],
          ...transactionData,
          amount: signedNewAmount,
        };
        
        return global.transactionsStore[index];
      }
    }
    return null;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
}

export async function deleteTransaction(id: string): Promise<boolean> {
  try {
    console.log('[actions] deleteTransaction', id);
    ensureStoresInitialized();
    // In a real app, this would be a database call
    if (global.transactionsStore) {
      const index = global.transactionsStore.findIndex(
        transaction => transaction.id === id
      );
      
      if (index !== -1) {
        const transaction = global.transactionsStore[index];
        
        // Remove the transaction's effect on the account balance
        await updateAccountBalance(transaction.accountId, -transaction.amount);
        
        // Remove the transaction
        global.transactionsStore = global.transactionsStore.filter(
          t => t.id !== id
        );
        
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
}
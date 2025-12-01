'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/types';
import { mockAccounts, mockCategories } from '@/lib/mock-data';

interface EditTransactionFormProps {
  transaction: Transaction;
}

export function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: transaction.description,
    amount: (transaction.amount / 100).toFixed(2), // Convert cents to dollars
    accountId: transaction.accountId,
    categoryId: transaction.categoryId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const amount = parseFloat(formData.amount);
    if (!formData.description.trim()) {
      setError('Description is required');
      setIsLoading(false);
      return;
    }
    if (isNaN(amount) || amount === 0) {
      setError('Amount must be a valid number greater than 0');
      setIsLoading(false);
      return;
    }
    
    try {
      // Send update via API route (amount in euros)
      const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: formData.description,
          amount: Number(formData.amount),
          accountId: formData.accountId,
          categoryId: formData.categoryId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to update');
      }

      router.push('/');
    } catch (err) {
      console.error('Error updating transaction:', err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'An error occurred while updating the transaction. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount (€)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          disabled={isLoading}
          required
          step="0.01"
          placeholder="e.g., 25.50"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>

      <div>
        <label htmlFor="accountId" className="block text-sm font-medium text-slate-700">Account</label>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
        >
          {mockAccounts.map(account => (
            <option key={account.id} value={account.id}>{account.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
        >
          {mockCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Updating...' : 'Update Transaction'}
      </button>
    </form>
  );
}

'use client'; // This directive marks this as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAccounts, mockCategories } from '@/lib/mock-data';

export function TransactionForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    accountId: mockAccounts[0].id, // Default to the first account
    categoryId: mockCategories[0].id, // Default to the first category
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just log the data and go back to the dashboard.
    // In a real app, this is where you would send the data to an API.
    console.log('New Transaction:', {
      ...formData,
      amount: parseInt(formData.amount) * 100, // Convert dollars to cents
    });

    // Redirect back to the dashboard after submission
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount ($)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          step="0.01"
          placeholder="e.g., 25.50"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="accountId" className="block text-sm font-medium text-slate-700">Account</label>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        >
          {mockCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
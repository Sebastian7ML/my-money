'use client';

import { Transaction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
// use API route for delete to keep client/server separation
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data?.error || 'Failed to delete';
        // surface error to user
        alert(`Delete failed: ${message}`);
        return;
      }
      router.refresh(); // Refresh the page to show updated data
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Delete failed: network or server error');
    } finally {
      setIsDeleting(null);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700">Recent Transactions</h2>
      </div>
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center p-4 border-b border-slate-100 last:border-b-0"
          >
            <div>
              <p className="font-medium text-slate-800">{transaction.description}</p>
              <p className="text-sm text-slate-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </span>
              <div className="flex space-x-1">
                <Link
                  href={`/edit/${transaction.id}`}
                  className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  disabled={isDeleting === transaction.id}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                  {isDeleting === transaction.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
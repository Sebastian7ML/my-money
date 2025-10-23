import { TransactionForm } from '@/components/TransactionForm';
import Link from 'next/link';

export default function AddTransactionPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Add Transaction</h1>
          <Link
            href="/"
            className="text-sky-600 hover:text-sky-800 font-medium"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <TransactionForm />
        </div>
      </div>
    </main>
  );
}
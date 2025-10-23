import { Transaction } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
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
            <span
              className={`font-bold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(transaction.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
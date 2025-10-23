import { Account } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700">{account.name}</h3>
      <p
        className={`text-2xl font-bold ${
          account.balance >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatCurrency(account.balance)}
      </p>
    </div>
  );
}